import React from "react";

const InputField = ({ label, type, name, register, error, placeholder }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-1 capitalize">
      {label}
    </label>
    <input
      type={type}
      id={name}
      {...register(name)}
      className={`border p-2 w-full outline-none rounded-md bg-slate-50 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      placeholder={placeholder}
    />
    {error && <span className="text-red-500 text-sm">{error.message}</span>}
  </div>
);

export default InputField;
