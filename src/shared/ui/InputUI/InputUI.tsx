import { forwardRef } from "react";
import "./index.scss";

interface Props {
  label: string;
  placeholder?: string;
  error?: string;
}

export const InputUI = forwardRef<
  HTMLInputElement,
  Props & React.InputHTMLAttributes<HTMLInputElement>
>(({ label, placeholder, error, ...props }, ref) => {
  return (
    <label className="input__wrapper flex flex-col items-start justify-start">
      <span className="input__wrapper-label Small">{label}</span>
      <input
        ref={ref}
        className="input__wrapper-field flex flex-row items-center justify-start Small"
        placeholder={placeholder}
        {...props}
      />
    </label>
  );
});

InputUI.displayName = "InputUI";
