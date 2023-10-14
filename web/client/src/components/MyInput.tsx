import { CSSProperties, ChangeEvent } from "react";

interface Props {
  className?: string;
  style?: CSSProperties;
  name?: string;
  id?: string;
  type?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  value?: string;
  autoComplete?: string;
}

const MyInput = ({
  className,
  style,
  name,
  id,
  type,
  onChange,
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
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      value={value}
      autoComplete={autoComplete}
    />
  );
};
1;
export default MyInput;
