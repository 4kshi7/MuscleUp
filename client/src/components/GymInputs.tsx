import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { responseDataAtom } from "../atoms/recoil";
import { z } from "zod";
import { toast } from "react-toastify";

const formDataSchema = z.object({
  age: z.number().int().min(12).max(100),
  height: z.number().int().max(230),
  weight: z.number().int().max(200),
  experience: z.string().min(1),
  schedule: z.string().min(1),
  hours: z.string().min(1),
  goal: z.string().min(1),
  diet: z.string().min(1),
});

const GymInputs: React.FC = () => {
  const [age, setAge] = useState<number | null>(null);
  const [experience, setExperience] = useState<string>("");
  const [schedule, setSchedule] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const [diet, setDiet] = useState<string>("");
  const [height, setHeight] = useState<number | null>(null);
  const [weight, setWeight] = useState<number | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const setResponseData = useSetRecoilState(responseDataAtom);
  const navigate = useNavigate();

  const inputClasses =
    "mt-1 px-4 py-2 w-[68%] md:w-[75%] md:w-3/4 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-transparent";
  const labelClasses = "block w-fit sm:w-1/4 text-sm font-medium";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form data against schema
      const formData = {
        age,
        height,
        weight,
        experience,
        schedule,
        hours,
        goal,
        diet,
      };
      formDataSchema.parse(formData); // Throws error if validation fails

      // If validation succeeds, proceed with form submission
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setResponseData(response.data);
      navigate("/advice");
    } catch (error: any) {
      toast.error("Please make sure you entered valid data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Gym Questionnaire
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-wrap items-center">
          <label htmlFor="age" className={labelClasses}>
            Age:
          </label>
          <input
            type="number"
            id="age"
            value={age || ""}
            onChange={(e) => setAge(parseInt(e.target.value))}
            required
            className={inputClasses}
          />
        </div>
        <div className="flex flex-wrap items-center">
          <label htmlFor="height" className={labelClasses}>
            Height (cm):
          </label>
          <input
            type="number"
            id="height"
            value={height || ""}
            onChange={(e) => setHeight(parseInt(e.target.value))}
            required
            className={inputClasses}
          />
        </div>
        <div className="flex flex-wrap items-center">
          <label htmlFor="weight" className={labelClasses}>
            Weight (kg):
          </label>
          <input
            type="number"
            id="weight"
            value={weight || ""}
            onChange={(e) => setWeight(parseInt(e.target.value))}
            required
            className={inputClasses}
          />
        </div>
        <div className="flex flex-wrap items-center">
          <label htmlFor="experience" className={labelClasses}>
            Experience:
          </label>
          <select
            id="experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
            className={`mt-1 w-full sm:w-3/4 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 ${inputClasses}`}
          >
            <option value="">Select Experience</option>
            <option value="beginner">Beginner (1-2 months)</option>
            <option value="intermediate">Intermediate (1-2 years)</option>
            <option value="experienced">Experienced (+3 years)</option>
          </select>
        </div>
        <div className="flex flex-wrap items-center">
          <label htmlFor="schedule" className={labelClasses}>
            Schedule:
          </label>
          <select
            id="schedule"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            required
            className={`mt-1 w-full sm:w-3/4 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 ${inputClasses}`}
          >
            <option value="">Select Schedule</option>
            <option value="2 days">2 days</option>
            <option value="3 days">3 days</option>
            <option value="4 days">4 days</option>
            <option value="5 days">5 days</option>
            <option value="6 days">6 days</option>
            <option value="7 days">7 days</option>
          </select>
        </div>
        <div className="flex flex-wrap items-center">
          <label htmlFor="hours" className={labelClasses}>
            Hours:
          </label>
          <select
            id="hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            required
            className={`mt-1 w-full sm:w-3/4 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 ${inputClasses}`}
          >
            <option value="">Select Hours</option>
            <option value="1 hour">1 hour</option>
            <option value="2 hours">2 hours</option>
            <option value="3 hours">3 hours</option>
            <option value="4 hours">4 hours</option>
            <option value="5 hours">5 hours</option>
            <option value="6 hours">6 hours</option>
          </select>
        </div>
        <div className="flex flex-wrap items-center">
          <label htmlFor="goal" className={labelClasses}>
            Goal:
          </label>
          <select
            id="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            required
            className={`mt-1 w-full sm:w-3/4 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 ${inputClasses}`}
          >
            <option value="">Select Goal</option>
            <option value="bulk">Bulk Up</option>
            <option value="cutting">Cutting Down</option>
            <option value="healthy">Stay Healthy and Active</option>
          </select>
        </div>
        <div className="flex flex-wrap items-center">
          <label htmlFor="diet" className={labelClasses}>
            Diet:
          </label>
          <select
            id="diet"
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            required
            className={`mt-1 w-full sm:w-3/4 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 ${inputClasses}`}
          >
            <option value="">Select Diet</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="non-vegetarian">Non Vegetarian</option>
            <option value="vegetarian+eggs">Vegetarian + Eggs</option>
          </select>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="py-2 w-[24vw] md:w-[8vw] bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? <Spinner /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GymInputs;

export function Spinner() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className="w-7 h-7 animate-spin mx-auto"
      viewBox="0 0 16 16"
    >
      <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
      <path
        fillRule="evenodd"
        d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
      />
    </svg>
  );
}
