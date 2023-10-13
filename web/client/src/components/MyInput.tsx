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
  value?: string;
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
  value,
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
      value={value}
    />
  );
};

export default MyInput;
