import React, { createContext, useContext, useEffect, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_VALUES": {
      return {
        ...state,
        value: {
          ...state.value,
          [action.name]: action.value,
        },
      };
    }
    case "SET_TOUCHED": {
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.name]: true,
        },
      };
    }
    case "SET_TOUCHED_ALL": {
      const nextTouched = Object.keys(state.value).reduce((acc, cur) => {
        acc[cur] = true;
        return acc;
      }, {});
      return {
        ...state,
        touched: nextTouched,
      };
    }
    case "VALIDATE": {
      return {
        ...state,
        error: action.validate(state.value),
      };
    }
    default: {
      throw `unkown action ${action}`;
    }
  }
};

const getInitalState = (value) => {
  return {
    value,
    error: {},
    touched: {},
  };
};

export const useForm = ({ initalValues, validate, onSubmit }) => {
  const [state, dispatch] = useReducer(formReducer, getInitalState(initalValues));

  const handleChnage = (e) => {
    dispatch({ type: "SET_VALUES", name: e.target.name, value: e.target.value });
  };

  const handleBlur = (e) => {
    dispatch({ type: "SET_TOUCHED", name: e.target.name });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_TOUCHED_ALL" });
    const nextState = formReducer(state, { type: "VALIDATE", validate });

    if (Object.values(nextState.error).some(Boolean)) return;
    onSubmit(nextState.value);
  };

  const getFieldProps = (name) => {
    return {
      name,
      value: state.value[name],
      onChange: handleChnage,
      onBlur: handleBlur,
    };
  };

  useEffect(() => {
    dispatch({ type: "VALIDATE", validate });
  }, [state.value]);

  return {
    ...state,
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
