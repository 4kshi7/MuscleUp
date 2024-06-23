import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import z from "zod";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { responseDataAtom } from "../atoms/recoil";
import { Spinner } from "../components/GymInputs";
import Slider from "../components/Slider";
import InputSelector from "../components/InputComponent";

const formDataSchema = z.object({
  age: z.number().int().min(15).max(100),
  height: z.number().int().max(230),
  weight: z.number().int().max(200),
  experience: z.string().min(1),
  schedule: z.number().min(1).max(7),
  hours: z.number().min(1).max(6),
  goal: z.string().min(1),
  diet: z.string().min(1),
  gender: z.string().min(1),
});

export const Dash2 = () => {
  const goals = [
    {
      id: "cutting",
      title: "Cut Down",
      icon: "🔥",
      description: "Burn fats and gain muscle",
    },
    {
      id: "healthy",
      title: "Cardiovascular",
      icon: "❤️",
      description: "Better heart health and blood vessels",
    },
    {
      id: "bulk",
      title: "Bulk Up",
      icon: "💪",
      description: "Gain those muscles",
    },
  ];

  const experienceData = [
    {
      id: "beginner",
      title: "Beginner",
      icon: "😅",
      description: "About to start gym journey",
    },
    {
      id: "intermediate",
      title: "Intermediate",
      icon: "😊",
      description: "Been to gym for 1-2 years",
    },
    {
      id: "advance",
      title: "Advance",
      icon: "😎",
      description: "Have plenty experience",
    },
  ];

  const genderData = [
    {
      id: "male",
      title: "Male",
      icon: "🚹",
      description: "",
    },
    {
      id: "female",
      title: "Female",
      icon: "🚺",
      description: "",
    },
    {
      id: "LGBTQ individual",
      title: "Others",
      icon: "🏳️‍🌈",
      description: "",
    },
  ];

  const dietData = [
    {
      id: "vegetarian",
      title: "Vegetarian",
      icon: "🍏🫑",
      description: "I love veggies!",
    },
    {
      id: "non vegetarian",
      title: "Non Vegetarian",
      icon: "🥩🍗",
      description: "Who loves veggies?😂",
    },
    {
      id: "vegetarian + egg",
      title: "Eggs",
      icon: "🥚🍳",
      description: "I prefer eggs and veggies!",
    },
  ];
  //string states
  const [gender, setGender] = useState<string | null>(null);
  const [goal, setGoal] = useState<string | null>(null);
  const [experience, setExperience] = useState<string | null>(null);
  const [diet, setDiet] = useState<string | null>(null);

  //num states
  const [age, setAge] = useState<number>(22);
  const [height, setHeight] = useState<number>(140);
  const [weight, setWeight] = useState<number>(53);
  const [schedule, setSchedule] = useState<number>(2);
  const [hours, setHours] = useState<number>(1);

  const handleSetGoal = (goal: string) => {
    setGoal(goal);
  };

  const handleSetExperience = (experience: string) => {
    setExperience(experience);
  };

  const handleSetGender = (gender: string) => {
    setGender(gender);
  };

  const handleAgeChange = (newValue: number) => {
    setAge(newValue);
  };

  const handleHeightChange = (newValue: number) => {
    setHeight(newValue);
  };

  const handleWeightChange = (newValue: number) => {
    setWeight(newValue);
  };

  const handleDietChange = (diet: string) => {
    setDiet(diet);
  };

  const handleScheduleChange = (schedule: number) => {
    setSchedule(schedule);
  };

  const handleHoursChange = (hours: number) => {
    setHours(hours);
  };

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
        gender,
        experience,
        schedule,
        hours,
        goal,
        diet,
      };
      formDataSchema.parse(formData);
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
      toast.error(error.errors[0].message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex justify-center  py-6 px-5 md:px-10 lg:px-20">
        <form onSubmit={handleSubmit} className=" w-full space-y-10">
          <InputSelector
            goal={goal}
            setGoal={handleSetGoal}
            goals={goals}
            label={"Fitness Goal 🏃"}
          />
          <Slider
            label="What is your current age ? "
            value={age}
            min={15}
            max={100}
            onChange={handleAgeChange}
            units="years"
            title="old"
          />

          <InputSelector
            goal={experience}
            setGoal={handleSetExperience}
            goals={experienceData}
            label={"Tell about your experience"}
          />

          <InputSelector
            goal={gender}
            setGoal={handleSetGender}
            goals={genderData}
            label={"What is your gender? "}
          />

          <Slider
            label="What is your height? 📏"
            value={height}
            min={100}
            max={230}
            onChange={handleHeightChange}
            units="cms"
            title=""
          />

          <Slider
            label="What is your current weight? ⚖️"
            value={weight}
            min={30}
            max={200}
            onChange={handleWeightChange}
            units="kgs"
            title="weight"
          />
          <InputSelector
            goal={diet}
            setGoal={handleDietChange}
            goals={dietData}
            label={"What diet will you follow? "}
          />

          <Slider
            label="How many days will you prefer? ⚖️"
            value={schedule}
            min={1}
            max={7}
            onChange={handleScheduleChange}
            units="days"
            title=""
          />
          <Slider
            label="How many hours will you prefer? ⚖️"
            value={hours}
            min={1}
            max={6}
            onChange={handleHoursChange}
            units="hours"
            title=""
          />

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
    </>
  );
};
