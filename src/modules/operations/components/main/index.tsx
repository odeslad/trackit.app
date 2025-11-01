import { InputText } from '#/components/input-text';
import React, { useEffect } from 'react';
import style from './style.module.css';
import { Button } from '#/components/button';
import { Separator } from '#/components/separator';
import { Select } from '#/components/select';


type Operation = {
  id: string;
  date: string;
  concept: string;
  type: string;
  account: string;
  amount: string;
}

export const MainOperations = () => {

  const [form, setForm] = React.useState<Operation>({
    id: "",
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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
            className='x-small'
            onChange={handleInputChange} />
          <Select
            label="Concepto"
            name="concept"
            value={form.concept}
            placeholder="Seleccione un concepto"
            className='small'
            options={{ '1': 'Restaurante', '2': 'Vehiculo' }}
            onChange={handleSelectChange} />
          <Select
            label="Tipo"
            name="type"
            value={form.type}
            placeholder="Seleccione un tipo"
            className='small'
            options={{ '1': 'Ingreso', '2': 'Gasto' }}
            onChange={handleSelectChange} />
        </div>
        <div className={style.row}>
          <Select
            label="Cuenta"
            name="account"
            value={form.account}
            placeholder="Seleccione una cuenta"
            className='small'
            options={{ '1': 'Cuenta 1', '2': 'Cuenta 2' }}
            onChange={handleSelectChange} />
          <InputText
            label="Importe"
            name="amount"
            value={form.amount}
            className='x-small'
            onChange={handleInputChange} />
          <Separator />
          <Button
            className='error'
            onClick={() => { }}>
            Agregar
          </Button>
        </div>
      </div>
      <div className={style.data}>

      </div>
      <div className={style.footer}>
      </div>
    </>
  );
}