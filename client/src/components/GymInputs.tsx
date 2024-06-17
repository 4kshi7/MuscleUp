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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
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
    <div className="p-6 mx-auto rounded-xl shadow-xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Tell your goals
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6 lg:w-[45vw]">
        <div>
          <h3 className="text-lg font-semibold mb-2">
            My Fitness Goal Is To...
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <button
              type="button"
              className={`flex flex-col items-center justify-center p-4 border rounded-md ${
                goal === "bulk" ? "bg-indigo-500/50 text-black" : "bg-white/60"
              }`}
              onClick={() => setGoal("bulk")}
            >
              <span className="text-2xl">💪</span>
              <span className="text-sm">Gain Muscle</span>
            </button>
            <button
              type="button"
              className={`flex flex-col items-center justify-center p-4 border rounded-md ${
                goal === "cutting" ? "bg-indigo-500/50 text-black" : "bg-white/60"
              }`}
              onClick={() => setGoal("cutting")}
            >
              <span className="text-2xl">⚖️</span>
              <span className="text-sm">Lose Weight</span>
            </button>
            <button
              type="button"
              className={`flex flex-col items-center justify-center p-4 border rounded-md ${
                goal === "healthy" ? "bg-indigo-500/50 text-black" : "bg-white/60"
              }`}
              onClick={() => setGoal("healthy")}
            >
              <span className="text-2xl">🏃‍♂️</span>
              <span className="text-sm">Stay Healthy</span>
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">
            My Current Fitness Level Is...
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <button
              type="button"
              className={`flex flex-col items-center justify-center p-4 border rounded-md ${
                experience === "beginner"
                  ? "bg-indigo-500/50 text-black"
                  : "bg-white/60"
              }`}
              onClick={() => setExperience("beginner")}
            >
              <span className="text-2xl">😅</span>
              <span className="text-sm">Beginner</span>
            </button>
            <button
              type="button"
              className={`flex flex-col items-center justify-center p-4 border rounded-md ${
                experience === "intermediate"
                  ? "bg-indigo-500/50 text-black"
                  : "bg-white/60"
              }`}
              onClick={() => setExperience("intermediate")}
            >
              <span className="text-2xl">😊</span>
              <span className="text-sm">Intermediate</span>
            </button>
            <button
              type="button"
              className={`flex flex-col items-center justify-center p-4 border rounded-md ${
                experience === "experienced"
                  ? "bg-indigo-500/50 text-black"
                  : "bg-white/60"
              }`}
              onClick={() => setExperience("experienced")}
            >
              <span className="text-2xl">😎</span>
              <span className="text-sm">Experienced</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="age" className="block text-sm font-medium">
              Age:
            </label>
            <input
              type="number"
              id="age"
              value={age || ""}
              onChange={(e) => setAge(parseInt(e.target.value))}
              required
              className="mt-1 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="height" className="block text-sm font-medium">
              Height (cm):
            </label>
            <input
              type="number"
              id="height"
              value={height || ""}
              onChange={(e) => setHeight(parseInt(e.target.value))}
              required
              className="mt-1 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="weight" className="block text-sm font-medium">
              Weight (kg):
            </label>
            <input
              type="number"
              id="weight"
              value={weight || ""}
              onChange={(e) => setWeight(parseInt(e.target.value))}
              required
              className="mt-1 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="diet" className="block text-sm font-medium">
              Diet:
            </label>
            <select
              id="diet"
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
              required
              className="mt-1 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select Diet</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="non-vegetarian">Non Vegetarian</option>
              <option value="vegetarian+eggs">Vegetarian + Eggs</option>
            </select>
          </div>
          <div>
            <label htmlFor="schedule" className="block text-sm font-medium">
              Schedule:
            </label>
            <select
              id="schedule"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              required
              className="mt-1 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
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
          <div>
            <label htmlFor="hours" className="block text-sm font-medium">
              Hours:
            </label>
            <select
              id="hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              required
              className="mt-1 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
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
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="py-2 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
