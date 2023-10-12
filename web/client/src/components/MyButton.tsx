import { CSSProperties } from "react";

interface Props {
  className?: string;
  children?: string;
  onClick?: () => void | null;
  type?: "button" | "submit" | "reset" | undefined;
  style?: CSSProperties;
}

const MyButton = ({ className, children, onClick, type, style }: Props) => {
  return (
    <button className={className} onClick={onClick} type={type} style={style}>
      {children}
    </button>
  );
};

export default MyButton;
