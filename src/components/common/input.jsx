import React from "react";

const Input = ({ name, type, value, label, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        onChange={onChange}
        value={value}
        name={name}
        id={name}
        type={type}
        className="form-control"
      />
    </div>
  );
};

export default Input;
