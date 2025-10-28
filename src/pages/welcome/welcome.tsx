// @ts-expect-error: TS6133
import React from "react";

import style from "./style.module.css";

import { Form, useActionData, useLoaderData } from "react-router";

export const Welcome = () => {

  const data = useLoaderData();
  const message = useActionData();
  return (

    <div className={style.welcome}>
      <p>{data?.message}</p>
      <Form method="post">
        <label>
          Name: <input type="text" name="name" />
        </label>
        <button type="submit">Submit</button>
      </Form>
      {message && <p>{message.message}</p>}
    </div>
  );
}
