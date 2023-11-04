import React, { createContext, useContext, useEffect, useState } from "react";

export const useForm = ({ initalValues, validate, onSubmit }) => {
  const [value, setValue] = useState(initalValues);
  const [error, setError] = useState({});
  const [touched, setTouched] = useState({});

  const handleChnage = (e) => {
    const nextValue = {
      ...value,
      [e.target.name]: e.target.value,
    };
    setValue(nextValue);
  };

  const handleBlur = (e) => {
    const nextTouched = {
      ...touched,
      [e.target.name]: true,
    };
    setTouched(nextTouched);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextTouched = Object.keys(initalValues).reduce((acc, cur) => {
      acc[cur] = true;
      return acc;
    }, {});
    setTouched(nextTouched);
    const errors = validate(value);
    setError(errors);
    if (Object.values(errors).some(Boolean)) return;
    onSubmit(value);
  };

  const getFieldProps = (name) => {
    return {
      name,
      value: value[name],
      onChange: handleChnage,
      onBlur: handleBlur,
    };
  };

  useEffect(() => {
    setError(validate(value));
  }, [value]);

  return {
    value,
    error,
    touched,
    handleBlur,
    handleChnage,
    handleSubmit,
    getFieldProps,
  };
};

const formContext = createContext();
formContext.displayName = "FormContext";

export const Form = ({ id, className, children, ...rest }) => {
  const formValue = useForm(rest);
  return (
    <formContext.Provider value={formValue}>
      <form noValidate id={id} className={className} onSubmit={formValue.handleSubmit}>
        {children}
      </form>
    </formContext.Provider>
  );
};

export const ErrorMessage = ({ name }) => {
  const { touched, error } = useContext(formContext);
  if (!touched[name] || !error[name]) return null;
  return <span>{error[name]}</span>;
};

export const Field = ({ as = "input", children, ...rest }) => {
  const { getFieldProps } = useContext(formContext);
  return React.createElement(as, { ...rest, ...getFieldProps(rest.name) }, children);
};
