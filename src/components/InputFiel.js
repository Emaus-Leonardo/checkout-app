import React from "react";

const InputField = ({
    label,
    type,
    name,
    value,
    onChange,
    error,
    placeholder,
  }) => (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1 capitalize">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className={`border p-2 w-full outline-none rounded-md bg-slate-50 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );

export default InputField;