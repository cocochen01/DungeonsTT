import { useState, useEffect } from "react";
import { useTabletopStore } from "../../../store/useTabletopStore";

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
}

const InputField = ({ label, value, onChange, min = 1, max = 50 }: InputFieldProps) => {
  const [inputValue, setInputValue] = useState(value.toString());

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    if (val === "") return;

    let num = parseInt(val);
    if (isNaN(num)) return;

    num = Math.min(Math.max(num, min), max);
    onChange(num);
  };

  return (
    <label className="flex flex-col">
      {label}
      <input
        type="number"
        value={inputValue}
        onChange={handleChange}
        className="border p-2 rounded"
        placeholder={value.toString()}
      />
    </label>
  );
};

const GridSettings = () => {
  const { cellSize, rows, cols, setCellSize, setRows, setCols } = useTabletopStore();

  return (
    <div className="flex flex-col w-full h-full p-4 space-y-4">
      <InputField label="Rows" value={rows} onChange={setRows} />
      <InputField label="Columns" value={cols} onChange={setCols} />
      <InputField label="Cell Size" value={cellSize} onChange={setCellSize} />
    </div>
  );
};

export default GridSettings;
