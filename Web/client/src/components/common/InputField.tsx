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
    />
  );
};

export default InputField;
