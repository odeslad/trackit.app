import style from './style.module.css';
import { InputText } from '#/components/input-text';
import React, { useEffect } from 'react';
import { Button } from '#/components/button';
import { Separator } from '#/components/separator';
import { Select } from '#/components/select';
import { InputDate } from '#/components/input-date';


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
          <InputDate
            label="Fecha"
            name="date"
            value={form.date}
            placeholder="dd/mm/yyyy"
            className="xsmall"
            onChange={handleInputChange} />
          <Select
            label="Concepto"
            name="concept"
            value={form.concept}
            placeholder="Seleccione un concepto"
            className="small"
            options={{ '1': 'Restaurante', '2': 'Vehiculo' }}
            onChange={handleSelectChange} />
          <Select
            label="Tipo"
            name="type"
            value={form.type}
            placeholder="Seleccione un tipo"
            className="small"
            options={{ '1': 'Ingreso', '2': 'Gasto' }}
            onChange={handleSelectChange} />
        </div>
        <div className={style.row}>
          <Select
            label="Cuenta"
            name="account"
            value={form.account}
            placeholder="Seleccione una cuenta"
            className="small"
            options={{ '1': 'Cuenta 1', '2': 'Cuenta 2' }}
            onChange={handleSelectChange} />
          <InputText
            label="Importe"
            name="amount"
            value={form.amount}
            className='xsmall'
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
        <table className={style.table}>
          <thead>
            <tr className={style.tableHeader}>
              <th className={style.xsmall}>Fecha</th>
              <th className={style.xsmall}>Concepto</th>
              <th className={style.fill}>Tipo</th>
              <th className={style.xsmall}>Cuenta</th>
              <th className={style.xsmall}>Importe</th>
            </tr>
          </thead>
          <tbody>
            <tr className={style.tableRow}>
              <td className={style.xsmall}>01/01/2023</td>
              <td className={style.xsmall}>Restaurante</td>
              <td className={style.fill}>Gasto</td>
              <td className={style.xsmall}>Cuenta 1</td>
              <td className={style.xsmall}>$100</td>
            </tr>
            <tr className={style.tableRow}>
              <td className={style.xsmall}>01/01/2023</td>
              <td className={style.xsmall}>Restaurante</td>
              <td className={style.fill}>Gasto</td>
              <td className={style.xsmall}>Cuenta 1</td>
              <td className={style.xsmall}>$100</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={style.footer}>
      </div>
    </>
  );
}