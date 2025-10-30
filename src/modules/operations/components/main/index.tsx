import { InputText } from '#/components/input-text';
import React, { use, useEffect } from 'react';
import style from './style.module.css';
import { Button } from '#/components/button';
import { Separator } from '#/components/separator';

export const MainOperations = () => {

  const [form, setForm] = React.useState({
    operationName: "",
    date: "",
    concept: "",
    type: "",
    account: "",
    amount: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }

  useEffect(() => {
    console.log(form);
  }, [form]);

  return (
    <>
      <div className={style.header}>
        <h4>Operaciones</h4>
      </div>
      <div className={style.form}>
        <div className={style.row}>
          <InputText
            label="Fecha"
            name="date"
            value={form.date}
            className='x-small' onChange={handleInputChange} />
          <InputText label="Concepto" name="concept" value={form.concept} className='small' onChange={handleInputChange} />
          <InputText label="Tipo" name="type" value={form.type} className='small' onChange={handleInputChange} />
        </div>
        <div className={style.row}>
          <InputText label="Cuenta" name="account" value={form.account} className='small' onChange={handleInputChange} />
          <InputText label="Importe" name="amount" value={form.amount} className='x-small' onChange={handleInputChange} />
          <Separator />
          <Button className='error' onClick={() => { }}>Agregar</Button>
        </div>
      </div>
      <div className={style.data}>

      </div>
      <div className={style.footer}>
      </div>
    </>
  );
}