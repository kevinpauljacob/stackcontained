import { useState } from "react";

interface Option {
  key: number;
  label: string;
  value: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Select({ value, onChange }: SelectProps) {
  const [open, setOpen] = useState(false);
  const options: Option[] = [
    { key: 1, label: "Javascript", value: "Javascript" },
    { key: 2, label: "Java", value: "Java" },
    { key: 3, label: "C++", value: "C++" },
    { key: 4, label: "Python", value: "Python" },
  ];

  const handleSelect = (value: string) => {
    onChange(value);
    setOpen(false);
  };

  return (
    <div
      onClick={() => {
        setOpen(!open);
      }}
      className="relative bg-primary text-sm rounded-md px-4 py-2.5"
    >
      <p>{value || "Select"}</p>
      {open && (
        <div className="absolute -top-[180px] lg:top-12 z-[150] max-h-[195px] lg:max-h-[335px] xl:max-h-[380px] overflow-y-scroll no-scrollbar left-0 bg-primary border border-white/10 rounded-md animate-fadeIn w-full">
          {options.map((option) => (
            <div
              key={option.key}
              className={`${
                value === option.value
                  ? "text-white bg-white/10 hover:bg-secondary/10"
                  : "hover:bg-white/10"
              } border-b border-r border-[#2A2E38] py-1.5 px-3`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
