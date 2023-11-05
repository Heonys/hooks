import React, { createContext, useContext, useEffect, useState } from "react";

export const useForm = ({ initalValue, validate, onSubmit }) => {
  const [values, setValue] = useState(initalValue);
  const [errors, setErros] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    const errors = validate(values);
    setErros(errors);
    if (Object.values(errors).some(Boolean)) return;
    onSubmit(values);
  };

  const getFieldProps = (name) => {
    return {
      name,
      value: values[name],
      onChange: handleChange,
      onBlur: handleBlur,
    };
  };

  useEffect(() => {
    setErros(validate(values));
  }, [touched]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    getFieldProps,
  };
};

const formContext = createContext();
formContext.displayName = "FormContext";

const FormProvider = ({ children, ...rest }) => {
  const formValue = useForm(rest);

  return (
    <formContext.Provider value={formValue}>
      <form noValidate onSubmit={formValue.handleSubmit}>
        {children}
      </form>
    </formContext.Provider>
  );
};

const Field = ({ as = "input", children, name, ...rest }) => {
  const { getFieldProps } = useContext(formContext);
  return React.createElement(as, { ...getFieldProps(name), ...rest }, children);
};

const ErrorMessage = ({ name }) => {
  const { touched, errors } = useContext(formContext);
  if (!touched[name] || !errors[name]) return;
  return <span>{errors[name]}</span>;
};

const Button = ({ text }) => {
  return <button>{text}</button>;
};

const Form = Object.assign(FormProvider, {
  Field,
  ErrorMessage,
  Button,
});

export default Form;
