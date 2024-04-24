import React, { useState } from 'react';

type FormValues = {
  [key: string]: string;
};

type ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;

function useForm(inputValues: FormValues) {
  const [values, setValues] = useState<FormValues>(inputValues);

  const handleChange:ChangeEventHandler = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}

export default useForm;
