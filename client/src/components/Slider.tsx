import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  title: string;
  units: string;
}

const Slider: React.FC<SliderProps> = ({ label, value, min, max, onChange, title, units }) => {
  const handleIncrement = () => {
    onChange(Math.min(value + 1, max));
  };

  const handleDecrement = () => {
    onChange(Math.max(value - 1, min));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value));
  };

  return (
    <div className="max-w-3xl mx-auto py-3 px-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        {label}
      </h2>
      <div className="flex items-center justify-between mb-4">
        <button
          type="button" // Prevents form submission
          onClick={handleDecrement}
          className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 focus:outline-none"
        >
          -
        </button>
        <span className="text-4xl font-bold">{value}</span>
        <button
          type="button" // Prevents form submission
          onClick={handleIncrement}
          className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 focus:outline-none"
        >
          +
        </button>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleSliderChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="text-center text-sm text-gray-600">
           {units} {title}
        </div>
      </div>
    </div>
  );
};

export default Slider;
