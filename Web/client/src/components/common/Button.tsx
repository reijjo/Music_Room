interface Props {
  className?: string;
  children?: string;
  onClick?: () => void | null;
  type?: "button" | "submit" | "reset" | undefined;
}

const MyButton = ({ className, children, onClick, type }: Props) => {
  return (
    <button className={className} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default MyButton;
