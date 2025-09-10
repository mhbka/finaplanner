import { useState } from "react";
import { inputClassName } from "./formUtils";

interface CustomInputProps {
  title: string;
  tooltip?: string;
  value: string | number | boolean | undefined;
  onChange: (value: string | number | boolean) => void;
  type?: 'text' | 'number' | 'checkbox';
  placeholder?: string;
  required?: boolean;
}


export const CustomInput: React.FC<CustomInputProps> = ({ 
  title, 
  tooltip, 
  value, 
  onChange, 
  type = 'text', 
  placeholder,
  required = false 
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'checkbox') {
      onChange(e.target.checked);
    } else if (type === 'number') {
      onChange(e.target.value ? Number(e.target.value) : '');
    } else {
      onChange(e.target.value);
    }
  };

  if (type === 'checkbox') {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 relative">
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={handleChange}
            className="rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <label className="text-sm font-medium text-gray-700 cursor-pointer">
            {title}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {tooltip && (
            <div className="relative">
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 text-xs w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                ?
              </button>
              {showTooltip && (
                <div className="absolute left-6 top-0 z-10 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                  {tooltip}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">
          {title}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {tooltip && (
          <div className="relative">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 text-xs w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              ?
            </button>
            {showTooltip && (
              <div className="absolute left-6 top-0 z-10 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                {tooltip}
              </div>
            )}
          </div>
        )}
      </div>
      <input
        type={type}
        className={inputClassName()}
        placeholder={placeholder || title}
        value={value?.toString()}
        onChange={handleChange}
      />
    </div>
  );
};