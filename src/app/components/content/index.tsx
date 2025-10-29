import style from './style.module.css';

export const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className={style.content}>
      {children}
    </section>
  );
}
