import style from './style.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const formatClassName = (className?: string) => {
  return `${style.button} ${className ? style[className] : ''}`;
}

export const Button = (props: ButtonProps) => {
  return (
    <button className={formatClassName(props.className)} onClick={props.onClick}>
      {props.children}
    </button>
  );
}