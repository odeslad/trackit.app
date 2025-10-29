import style from './style.module.css';

export const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.content}>
        <h1>Track<span className={style.highlight}>IT</span></h1>
        <div className={style.menu}>
          <a href="/operations" className={style.link}>Operaciones</a>
          <a href="/accounts" className={style.link}>Cuentas</a>
        </div>
      </div>
    </header>
  );
}