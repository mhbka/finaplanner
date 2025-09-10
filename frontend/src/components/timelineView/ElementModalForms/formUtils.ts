import type { FinancialElement } from "../../../types/financialElements";

/** Obtain an input's styling. */
export function inputClassName(): string {
    return "border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full";
} 

/** Obtain a button's styling. */
export function buttonClassName(color: 'blue' | 'red' | 'grey' = 'blue'): string {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-500/80 hover:bg-blue-500/100 focus:ring-blue-300",
    red: "bg-red-500/80 hover:bg-red-500/100 focus:ring-red-300",
    grey: "bg-gray-500/80 hover:bg-gray-500/100 focus:ring-gray-300",
  };

  return `${colorMap[color] ?? colorMap.blue} text-white font-medium px-5 py-2.5 rounded-xl shadow-lg backdrop-blur-sm transition duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-opacity-50`;
}

/** Props for a form. */
export interface FormProps<T extends FinancialElement> {
  element: T;
  onSave: (element: T) => void;
  onDelete: (elementId: string) => void;
}