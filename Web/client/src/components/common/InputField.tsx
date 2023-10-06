import { CSSProperties, ChangeEvent } from "react";

interface Props {
  style?: CSSProperties;
  className?: string;
  type?: "text" | "password" | "email" | "dropdown";
  autoComplete?: "off" | "on";
  required?: boolean;
  value?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  maxLength?: number;
  disabled?: boolean;
  readOnly?: boolean;
}

const InputField = ({
  style,
  className,
  type,
  autoComplete,
  required,
  value,
  name,
  id,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  maxLength,
  disabled,
  readOnly,
}: Props) => {
  return (
    <input
      style={style}
      className={className}
      type={type}
      autoComplete={autoComplete}
      required={required}
      value={value}
      name={name}
      id={id}
      placeholder={placeholder}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      maxLength={maxLength}
      disabled={disabled}
      readOnly={readOnly}
    />
  );
};

export default InputField;
