import React from 'react';
import { useForm, FormProvider, SubmitHandler, UseFormProps } from 'react-hook-form';

interface FormProps<T> extends UseFormProps<T> {
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
}

function Form<T>({ onSubmit, children, ...formConfig }: FormProps<T>) {
  const methods = useForm<T>(formConfig);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}

export default Form;
