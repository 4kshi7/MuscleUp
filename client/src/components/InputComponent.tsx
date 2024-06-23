import React from 'react';

interface InputSelectorProps {
  goal: string | null;
  setGoal: (goal: string) => void;
  goals: Input[];
  label : string | null;
}

interface Input {
  id: string;
  title: string;
  icon: string;
  description: string;
}

const InputSelector: React.FC<InputSelectorProps> = ({ goal, setGoal, goals,label }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-xl">
      <h3 className="text-xl font-semibold mb-4">{label}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {goals.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setGoal(item.id)}
            className={`flex flex-col items-center justify-between p-4 border rounded-lg transition-colors duration-200 ease-in-out ${
              goal === item.id
                ? 'bg-blue-100 border-blue-500'
                : 'bg-gray-50 border-gray-300'
            }`}
          >
            <div className="text-center">
              <h4 className="text-lg font-bold mb-2">{item.title}</h4>
              <span className="text-3xl mb-2">{item.icon}</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">{item.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};



export default InputSelector;
