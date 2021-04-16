import React from 'react';
import cases from 'jest-in-case';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Async from '../Async';
import { OPTIONS } from './constants';

test('defaults - snapshot', () => {
  const { container } = render(<Async />);
  expect(container).toMatchSnapshot();
});

/**
 * loadOptions with promise is not resolved and it renders loading options
 * confirmed by logging in component that loadOptions is resolved and options are available
 * but still loading options is rendered
 */
cases(
  'load option prop with defaultOptions true',
  async ({ props, expectOptionLength }) => {
    const { container } = render(
      <Async classNamePrefix="react-select" menuIsOpen {...props} />
    );

    await waitFor(() => {
      expect(container.querySelectorAll('.react-select__option').length).toBe(
        expectOptionLength
      );
    });
  },
  {
    'with callback  > should resolve options': {
      props: {
        defaultOptions: true,
        loadOptions: (inputValue, callBack) => callBack([OPTIONS[0]]),
      },
      expectOptionLength: 1,
    },
    'with promise  > should resolve options': {
      props: {
        defaultOptions: true,
        loadOptions: () => Promise.resolve([OPTIONS[0]]),
      },
      expectOptionLength: 1,
    },
  }
);

test('load options prop with defaultOptions true and inputValue prop', () => {
  const loadOptionsSpy = jest.fn(value => value);
  const searchString = 'hello world';
  render(
    <Async
      loadOptions={loadOptionsSpy}
      defaultOptions
      inputValue={searchString}
    />
  );
  expect(loadOptionsSpy).toHaveReturnedWith(searchString);
});

/**
 * loadOptions with promise is not resolved and it renders loading options
 * confirmed by logging in component that loadOptions is resolved and options are available
 * but still loading options is rendered
 */
cases(
  'load options props with no default options',
  async ({ props, expectloadOptionsLength }) => {
    let { container } = render(
      <Async
        className="react-select"
        classNamePrefix="react-select"
        {...props}
      />
    );
    let input = container.querySelector('div.react-select__input input');
    userEvent.type(input, 'a');
    await waitFor(() => {
      expect(container.querySelectorAll('.react-select__option').length).toBe(
        expectloadOptionsLength
      );
    });
  },
  {
    'with callback > should resolve the options': {
      props: {
        loadOptions: (inputValue, callBack) => callBack(OPTIONS),
      },
      expectloadOptionsLength: 17,
    },
    'with promise > should resolve the options': {
      props: {
        loadOptions: () => Promise.resolve(OPTIONS),
      },
      expectloadOptionsLength: 17,
    },
  }
);

test('to not call loadOptions again for same value when cacheOptions is true', () => {
  let loadOptionsSpy = jest.fn((_, callback) => callback([]));
  let { container } = render(
    <Async
      className="react-select"
      classNamePrefix="react-select"
      loadOptions={loadOptionsSpy}
      cacheOptions
    />
  );
  let input = container.querySelector('div.react-select__input input');

  fireEvent.input(input, {
    target: {
      value: 'foo',
    },
    bubbles: true,
    cancelable: true,
  });
  fireEvent.input(input, {
    target: {
      value: 'bar',
    },
    bubbles: true,
    cancelable: true,
  });
  fireEvent.input(input, {
    target: {
      value: 'foo',
    },
    bubbles: true,
    cancelable: true,
  });
  expect(loadOptionsSpy).toHaveBeenCalledTimes(2);
});

test('to create new cache for each instance', async () => {
  let loadOptionsOne = jest.fn();
  let { container: containerOne } = render(
    <Async
      classNamePrefix="react-select"
      cacheOptions
      menuIsOpen
      loadOptions={loadOptionsOne}
    />
  );
  userEvent.type(
    containerOne.querySelector('div.react-select__input input'),
    'a'
  );

  let loadOptionsTwo = jest.fn();
  let { container: containerTwo } = render(
    <Async
      classNamePrefix="react-select"
      cacheOptions
      menuIsOpen
      loadOptions={loadOptionsTwo}
    />
  );

  userEvent.type(
    containerTwo.querySelector('div.react-select__input input'),
    'a'
  );

  expect(loadOptionsOne).toHaveBeenCalled();
  expect(loadOptionsTwo).toHaveBeenCalled();
});

test('in case of callbacks display the most recently-requested loaded options (if results are returned out of order)', () => {
  let callbacks = [];
  const loadOptions = (inputValue, callback) => {
    callbacks.push(callback);
  };
  let { container } = render(
    <Async
      className="react-select"
      classNamePrefix="react-select"
      loadOptions={loadOptions}
    />
  );

  let input = container.querySelector('div.react-select__input input');
  fireEvent.input(input, {
    target: {
      value: 'foo',
    },
    bubbles: true,
    cancelable: true,
  });
  fireEvent.input(input, {
    target: {
      value: 'bar',
    },
    bubbles: true,
    cancelable: true,
  });
  expect(container.querySelector('.react-select__option')).toBeFalsy();
  callbacks[1]([{ value: 'bar', label: 'bar' }]);
  callbacks[0]([{ value: 'foo', label: 'foo' }]);
  expect(container.querySelector('.react-select__option').textContent).toBe(
    'bar'
  );
});

cases(
  'on data load menu position should',
  async ({ preventRecalculation, loader, recalculationCount }) => {
    const ref = React.createRef();

    const loaderSpy = jest.fn(loader);
    let { container } = render(
      <Async
        className="react-select"
        classNamePrefix="react-select"
        loadOptions={loaderSpy}
        preventMenuPositionRecalculation={preventRecalculation}
        ref={ref}
      />
    );

    let input = container.querySelector('div.react-select__input input');

    ref.current.recalculateMenuPlacement = jest.fn(
      ref.current.recalculateMenuPlacement
    );

    expect(ref.current.recalculateMenuPlacement).toHaveBeenCalledTimes(0);
    fireEvent.input(input, {
      target: {
        value: 'foo',
      },
      bubbles: true,
      cancelable: true,
    });

    await waitFor(() =>
      expect(ref.current.recalculateMenuPlacement).toHaveBeenCalledTimes(
        recalculationCount
      )
    );
  },
  {
    'promise => should be recalculated': {
      preventRecalculation: false,
      loader: () => new Promise(resolve => resolve(OPTIONS)),
      recalculationCount: 1,
    },
    'promise => should not be recalculated when preventMenuPositionRecalculation is used': {
      preventRecalculation: true,
      loader: () => new Promise(resolve => resolve(OPTIONS)),
      recalculationCount: 0,
    },
    'callback => should be recalculated': {
      preventRecalculation: false,
      loader: (input, callback) => callback(OPTIONS),
      recalculationCount: 1,
    },
    'callback => should not be recalculated when preventMenuPositionRecalculation is used': {
      preventRecalculation: true,
      loader: (input, callback) => callback(OPTIONS),
      recalculationCount: 0,
    },
  }
);

// QUESTION: we currently do not do this, do we want to?
test.skip('in case of callbacks should handle an error by setting options to an empty array', () => {
  const loadOptions = (inputValue, callback) => {
    callback(new Error('error'));
  };
  let { container } = render(
    <Async
      className="react-select"
      classNamePrefix="react-select"
      loadOptions={loadOptions}
      options={OPTIONS}
    />
  );
  let input = container.querySelector('div.react-select__input input');
  fireEvent.input(input, {
    target: {
      value: 'foo',
    },
    bubbles: true,
    cancelable: true,
  });
  expect(container.querySelectorAll('.react-select__option').length).toBe(0);
});
