/** @jsx jsx */
import { jsx } from '@emotion/react';
import { CSSObject } from '@emotion/serialize';
import type { ComponentMeta } from '@storybook/react';
import * as chrono from 'chrono-node';
import moment, { Moment } from 'moment';
import { useState } from 'react';
import Select, {
  components as SelectComponents,
  GroupProps,
  OptionProps,
} from 'react-select';
import { Field } from '../components';

export default {
  title: 'Select/ExperimentalDatePicker',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

export function ExperimentalDatePicker() {
  const [value, setValue] = useState<DateOption | null>(
    defaultOptions[0] as DateOption
  );
  const [options, setOptions] = useState(defaultOptions);

  function handleInputChange(val: string) {
    if (!val) {
      setOptions(defaultOptions);
      return;
    }
    const date = chrono.parseDate(suggest(val.toLowerCase()));
    if (!date) {
      setOptions([]);
      return;
    }
    setOptions([createOptionForDate(date), createCalendarOptions(date)]);
  }

  return (
    <Field label="ExperimentalDatePicker" htmlFor="experimental-date-picker-id">
      <Select<DateOption, false>
        inputId="experimental-date-picker-id"
        components={{ Group, Option }}
        filterOption={null}
        isMulti={false}
        isOptionSelected={(o, v) => v.some((i) => i.date.isSame(o.date, 'day'))}
        maxMenuHeight={380}
        onChange={(newValue) => setValue(newValue)}
        onInputChange={handleInputChange}
        options={options}
        value={value}
      />
    </Field>
  );
}

// =============================================================================
// Components
// =============================================================================

function Group(props: GroupProps<DateOption, false>) {
  const {
    Heading,
    getStyles,
    children,
    label,
    headingProps,
    cx,
    theme,
    selectProps,
  } = props;
  return (
    <div aria-label={label as string} css={getStyles('group', props)}>
      <Heading
        selectProps={selectProps}
        theme={theme}
        getStyles={getStyles}
        cx={cx}
        {...headingProps}
      >
        {label}
      </Heading>
      <div css={daysHeaderStyles}>
        {days.map((day, i) => (
          <span key={`${i}-${day}`} css={daysHeaderItemStyles}>
            {day}
          </span>
        ))}
      </div>
      <div css={daysContainerStyles}>{children}</div>
    </div>
  );
}

function Option(props: OptionProps<DateOption, false>) {
  const { data, getStyles, innerRef, innerProps } = props;
  if (data.display === 'calendar') {
    const defaultStyles = getStyles('option', props);
    const styles = getOptionStyles(defaultStyles);

    if (data.date.date() === 1) {
      const indentBy = data.date.day();
      if (indentBy) {
        styles.marginLeft = `${indentBy * 14 + 1}%`;
      }
    }

    return (
      <span {...innerProps} css={styles} ref={innerRef}>
        {data.date.format('D')}
      </span>
    );
  }
  return <SelectComponents.Option {...props} />;
}

// =============================================================================
// Utils
// =============================================================================

function createOptionForDate(d: Moment | Date) {
  const date = moment.isMoment(d) ? d : moment(d);
  return {
    date,
    value: date.toDate(),
    label: date.calendar(null, {
      sameDay: '[Today] (Do MMM YYYY)',
      nextDay: '[Tomorrow] (Do MMM YYYY)',
      nextWeek: '[Next] dddd (Do MMM YYYY)',
      lastDay: '[Yesterday] (Do MMM YYYY)',
      lastWeek: '[Last] dddd (Do MMM YYYY)',
      sameElse: 'Do MMMM YYYY',
    }),
  };
}

const defaultOptions: (DateOption | CalendarGroup)[] = [
  'today',
  'tomorrow',
  'yesterday',
].map((i) => createOptionForDate(chrono.parseDate(i)));

function createCalendarOptions(date = new Date()) {
  const daysInMonth = Array.apply(null, Array(moment(date).daysInMonth())).map(
    (x, i) => {
      const d = moment(date).date(i + 1);
      return { ...createOptionForDate(d), display: 'calendar' };
    }
  );
  return {
    label: moment(date).format('MMMM YYYY'),
    options: daysInMonth,
  };
}

defaultOptions.push(createCalendarOptions());

const suggestions = [
  'sunday',
  'saturday',
  'friday',
  'thursday',
  'wednesday',
  'tuesday',
  'monday',
  'december',
  'november',
  'october',
  'september',
  'august',
  'july',
  'june',
  'may',
  'april',
  'march',
  'february',
  'january',
  'yesterday',
  'tomorrow',
  'today',
].reduce<{ [key: string]: string }>((acc, str) => {
  for (let i = 1; i < str.length; i++) {
    acc[str.substr(0, i)] = str;
  }
  return acc;
}, {});

function suggest(str: string) {
  return str
    .split(/\b/)
    .map((i) => suggestions[i] || i)
    .join('');
}

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const daysHeaderStyles: CSSObject = {
  marginTop: '5px',
  paddingTop: '5px',
  paddingLeft: '2%',
  borderTop: '1px solid #eee',
};
const daysHeaderItemStyles: CSSObject = {
  color: '#999',
  cursor: 'default',
  fontSize: '75%',
  fontWeight: 500,
  display: 'inline-block',
  width: '12%',
  margin: '0 1%',
  textAlign: 'center',
};
const daysContainerStyles: CSSObject = {
  paddingTop: '5px',
  paddingLeft: '2%',
};

function getOptionStyles(defaultStyles: CSSObject): CSSObject {
  return {
    ...defaultStyles,
    display: 'inline-block',
    width: '12%',
    margin: '0 1%',
    textAlign: 'center',
    borderRadius: '4px',
  };
}

// =============================================================================
// Types
// =============================================================================

interface DateOption {
  date: Moment;
  value: Date;
  label: string;
  display?: string;
}

interface CalendarGroup {
  label: string;
  options: readonly DateOption[];
}
