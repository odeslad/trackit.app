
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
      <label htmlFor={props.name} className={style.label}>{props.label}</label>
      <input 
        type="text" 
        className={style.input} 
        id={props.name}
        name={props.name} 
        value={props.value} 
        onChange={props.onChange} />
    </div>
  );
};
