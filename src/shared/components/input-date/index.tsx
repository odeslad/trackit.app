
import { useEffect, useMemo, useRef, useState } from 'react';
import style from './style.module.css';
import { CalendarDays } from 'lucide-react';

interface InputDateProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const formatClassName = (className?: string) => {
  return `${className ? style[className] : ''} ${style.container} ${style.dateContent}`;
}

export const InputDate = (props: InputDateProps) => {

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

  const toISO = (d: Date) =>
    `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;

  const parseISO = (v?: string) => {
    if (!v) return null;
    const [y, m, d] = v.split('T')[0].split('-').map(Number);
    if (!y || !m || !d) return null;
    return new Date(Date.UTC(y, m - 1, d));
  };

  const todayUTC = (() => {
    const now = new Date();
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  })();

  const [viewDate, setViewDate] = useState<Date>(() => parseISO(props.value) ?? todayUTC);
  const selectedDate = useMemo(() => parseISO(props.value), [props.value]);

  useEffect(() => {
    if (open) setViewDate(parseISO(props.value) ?? todayUTC);
  }, [open, props.value]);

  const startOfMonth = (d: Date) => new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1));
  const addMonths = (d: Date, delta: number) => new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + delta, 1));

  const startDay = (d: Date) => {
    const first = startOfMonth(d);
    const offset = first.getUTCDay();
    const start = new Date(first);
    start.setUTCDate(first.getUTCDate() - offset);
    return start;
  };

  const weeks = useMemo(() => {
    const start = startDay(viewDate);
    const cells: { date: Date; inMonth: boolean; isToday: boolean; isSelected: boolean }[] = [];
    for (let i = 0; i < 42; i++) {
      const cur = new Date(start);
      cur.setUTCDate(start.getUTCDate() + i);
      const isToday = toISO(cur) === toISO(todayUTC);
      const isSelected = selectedDate ? toISO(cur) === toISO(selectedDate) : false;
      const inMonth = cur.getUTCMonth() === viewDate.getUTCMonth();
      cells.push({ date: cur, inMonth, isToday, isSelected });
    }
    return Array.from({ length: 6 }, (_, w) => cells.slice(w * 7, w * 7 + 7));
  }, [viewDate, selectedDate]);

  const monthName = new Intl.DateTimeFormat('es-ES', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(viewDate);
  const weekdayShort = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];

  const handlePrev = () => setViewDate((d) => addMonths(d, -1));
  const handleNext = () => setViewDate((d) => addMonths(d, 1));

  const handleSelectDate = (d: Date) => {
    const event = {
      target: { name: props.name, value: toISO(d) }
    } as React.ChangeEvent<HTMLInputElement>;
    props.onChange(event);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className={formatClassName(props.className)}>
      <label className={style.label}>{props.label}</label>
      <input
        ref={inputRef}
        className={style.date}
        type="text"
        name={props.name}
        value={props.value ? new Date(props.value).toLocaleDateString('es-ES') : ''}
        placeholder={props.placeholder}
        readOnly
        onChange={props.onChange}
      />
      <div className={style.icon} onClick={handleArrowClick}><CalendarDays size={16} /></div>
      <div className={`${style.dateMenu} ${!open ? style.dateMenuHidden : ""}`}>
        {/* Header navegación */}
        <div className={style.headerNavigation}>
          <button type="button" onClick={handlePrev} className={style.navButton}>‹</button>
          <strong>{monthName}</strong>
          <button type="button" onClick={handleNext} className={style.navButton}>›</button>
        </div>

        {/* Cabecera días de la semana */}
        <div className={style.weekdayHeader}>
          {weekdayShort.map((d) => (
            <div key={d} className={style.weekdayCell}>{d}</div>
          ))}
        </div>

        {/* Grilla del mes (6x7) */}
        <div className={style.monthGrid}>
          {weeks.flat().map(({ date, isSelected }) => {
            const baseStyle: React.CSSProperties = {
              height: 32,
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              userSelect: 'none',
              fontSize: 13,
              border: '1px solid transparent',
            };
            if (isSelected) baseStyle.border = '1px solid #666666ff';
            return (
              <div
                key={toISO(date)}
                onClick={() => handleSelectDate(date)}
                title={toISO(date)}
                style={baseStyle}
              >
                {date.getDate()}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
