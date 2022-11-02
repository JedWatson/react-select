import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import Select, { AriaOnFocus } from 'react-select';
import { ColourOption, colourOptions } from '../data';

export default {
  title: 'Select/CustomAriaLive',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

export function CustomAriaLive() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const handleMenuOpen = () => setIsMenuOpen(true);
  const handleMenuClose = () => setIsMenuOpen(false);

  const [ariaFocusMessage, setAriaFocusMessage] = React.useState('');
  const onFocus: AriaOnFocus<ColourOption> = ({ focused, isDisabled }) => {
    const message = `You are currently focused on option "${focused.label}"${
      isDisabled ? ', disabled' : ''
    }`;
    setAriaFocusMessage(message);
    return message;
  };

  return (
    <form style={styles.form}>
      <label style={styles.label} id="aria-label" htmlFor="aria-example-input">
        Select a color
      </label>

      {!!ariaFocusMessage && !!isMenuOpen && (
        <blockquote style={styles.blockquote}>{ariaFocusMessage}</blockquote>
      )}

      <Select
        inputId="aria-example-input"
        aria-labelledby="aria-label"
        ariaLiveMessages={{ onFocus }}
        onMenuClose={handleMenuClose}
        onMenuOpen={handleMenuOpen}
        options={colourOptions}
      />
    </form>
  );
}

// =============================================================================
// Styles
// =============================================================================

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  blockquote: {
    fontStyle: 'italic',
    margin: 0,
  },
  label: {
    fontWeight: 500,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
} as const;
