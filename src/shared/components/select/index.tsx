import { ChevronDown } from 'lucide-react';
import style from './style.module.css';
import { useEffect, useRef, useState } from 'react';

interface SelectProps {
  label: string;
  name: string;
  value: string;
  options: Record<string, string>;
  placeholder?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const formatClassName = (className?: string) => {
  return `${className ? style[className] : ''} ${style.container} ${style.selectContent}`;
}

export const Select = (props: SelectProps) => {

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  const handleArrowClick = () => {
    setOpen((v) => !v)
    if (inputRef.current && !open) {
      inputRef.current.focus();
    }
  };

  const handleOptionClick = (key: string) => {
    const event = {
      target: { name: props.name, value: key }
    } as React.ChangeEvent<HTMLSelectElement>;
    props.onChange(event);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className={formatClassName(props.className)}>
      <label className={style.label}>{props.label}</label>
      <input
        ref={inputRef}
        className={style.select}
        type="text"
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        readOnly
        onClick={handleArrowClick}
      />
      <div className={style.icon} onClick={handleArrowClick}><ChevronDown size={16} /></div>
      <div className={`${style.selectMenu} ${!open ? style.selectMenuHidden : ""}`}>
        {Object.entries(props.options).map(([key, label]) => (
          <div
            key={key}
            className={style.selectOption}
            onClick={() => handleOptionClick(label)}>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};