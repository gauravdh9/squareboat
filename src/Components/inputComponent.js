import React from "react";

const InputComponent = ({
  hanldeChange,
  value,
  error,
  placeholder,
  touched,
  onBlur,
  name,
  type,
  styling,
}) => {
  return (
    <div className="flex flex-col w-50">
      <span className="m-1 text-base lg:text-lg font-semibold text-gray-700">
        {name}
      </span>
      <input
        name={name}
        value={value}
        onChange={hanldeChange}
        type={type}
        placeholder={placeholder}
        onBlur={onBlur}
        className={styling}
      />

      <span
        className={`text-red-400 ${
          touched && error ? "visible" : "invisible"
        } font-semibold h-5 break-normal `}
      >
        {error}
      </span>
    </div>
  );
};

export default InputComponent;
