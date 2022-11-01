import * as React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Please make sure to import the stylesheet for Tailwind when using this component.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ type = 'button', ...props }, forwardedRef) {
    return (
      <button
        ref={forwardedRef}
        type={type}
        className="inline-flex items-center gap-2 rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        {...props}
      />
    );
  }
);
