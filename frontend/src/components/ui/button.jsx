import * as React from "react";

// Simple shadcn-style Button component
export const Button = React.forwardRef(
  ({ className = "", type = "button", ...props }, ref) => {
    return (
      <button
        type={type}
        className={
          `inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-800 disabled:opacity-50 disabled:pointer-events-none ` +
          `bg-yellow-800 text-white hover:bg-yellow-900 px-4 py-2 ` +
          className
        }
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
