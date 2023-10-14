import { CSSProperties, ChangeEvent, FocusEvent } from "react";

interface Props {
  style?: CSSProperties;
  className?: string;
  name?: string;
  id?: string;
  type?: string;
  value?: string;
  autoComplete?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

const MyInput = ({
  className,
  style,
  name,
  id,
  type,
  onChange,
  onFocus,
  onBlur,
  disabled,
  readOnly,
  required,
  value,
  autoComplete,
}: Props) => {
  return (
    <input
      className={className}
      style={style}
      name={name}
      id={id}
      type={type}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      value={value}
      autoComplete={autoComplete}
    />
  );
};

export default MyInput;
