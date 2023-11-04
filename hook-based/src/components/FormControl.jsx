import React from "react";

const FormControl = ({ label, required, htmlFor, error, children }) => {
  return (
    <div className="FormControl">
      <label htmlFor={htmlFor}>
        {label} {required && <span className="required">*</span>}
      </label>
      {children}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default FormControl;
