import React from "react";

interface TextInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "password";
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
}) => {
  return (
    <div className="flex flex-col">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500`}
        required={!!required}
      />
    </div>
  );
};

export default TextInput;
