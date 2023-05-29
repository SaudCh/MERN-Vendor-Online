import React from "react";
import Select from "react-select";

export const TextInput = ({
  label,
  name,
  value,
  onChange,
  type,
  error,
  placeholder,
  className,
  disabled,
}) => {
  return (
    <div className="flex flex-col py-2">
      <label>{label}</label>
      <input
        className={
          error
            ? `border py-2 pl-2 border-red-500 ${className}`
            : `border py-2 pl-2 ${className}`
        }
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && (
        <p className="text-red-500 text-xs italic mb-0 pb-0">{error}</p>
      )}
    </div>
  );
};

export const RadioButton = ({ label, name, value, onChange, checked }) => {
  return (
    <>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name={name}
          id={value}
          value={value}
          onChange={onChange}
          checked={checked}
        />
        <label className="form-check-label" htmlFor={name}>
          {label}
        </label>
      </div>
    </>
  );
};

export const SelectInput = ({
  label,
  name,
  options,
  onChange,
  placeholder,
  value,
  error,
}) => {
  return (
    <div className="py-2">
      {label && (
        <label htmlFor={name} className="form-label p-0 m-0 mb-0">
          {label}
        </label>
      )}
      <Select
        value={value}
        options={options}
        className="basic-single m-0 p-0"
        classNamePrefix="select"
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <p className="errors">{error}</p>}
    </div>
  );
};

export const CheckBox = ({ label, name, value, onChange, checked }) => {
  return (
    <>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="checkbox"
          name={name}
          id={value}
          value={value}
          onChange={onChange}
          checked={checked}
        />
        <label className="form-check-label" htmlFor={name}>
          {label}
        </label>
      </div>
    </>
  );
};

export const FloatingInput = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  disabled,
  error,
}) => {
  return (
    <>
      <div className="form-floating mb-3">
        <input
          type={type}
          name={name}
          className={error ? `is-invalid form-control` : `form-control`}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        <label for={name}>{label}</label>
        {error && <p className="errors">{error}</p>}
      </div>
    </>
  );
};
