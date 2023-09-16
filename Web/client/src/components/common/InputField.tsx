import { CSSProperties, ChangeEvent } from "react";

interface Props {
  style?: CSSProperties;
  className?: string;
  type?: "text" | "password" | "email";
  autoComplete?: "off" | "on";
  required?: boolean;
  value?: string;
  name?: string;
  id?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
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
  onChange,
  onFocus,
  onBlur,
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
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

export default InputField;
