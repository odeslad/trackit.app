
import style from './style.module.css';

interface InputTextProps {
  label: string;
  name: string;
  value: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const formatClassName = (className?: string) => {
  return `${className ? style[className] : ''} ${style.container}`;
}

export const InputText = (props: InputTextProps) => {
  return (
    <div className={formatClassName(props.className)}>
      <label className={style.label}>{props.label}</label>
      <input className={style.input} type="text" name={props.name} value={props.value} onChange={props.onChange} />
    </div>
  );
};
