"use client";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import db from "@/firebase";
import Sidebar from "../Components/Sidebar";
import { FaBurn, FaUtensils, FaClock } from "react-icons/fa";
import { Line } from 'react-chartjs-2';
import { useAuthInfo, useLogoutFunction } from "@propelauth/react"; // Import necessary hooks for authentication

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [totalCaloriesIntake, setTotalCaloriesIntake] = useState(0);
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(0);
  const [totalWorkoutDuration, setTotalWorkoutDuration] = useState(0);
  
  // Replace `useUser` with `useAuthInfo` or appropriate PropelAuth hook
  const { user, isLoggedIn } = useAuthInfo(); 
  const logout = useLogoutFunction(); // Use PropelAuth logout function

  useEffect(() => {
    if (isLoggedIn && user) {
      const fetchUserData = async () => {
        try {
          const userDocRef = doc(db, "users", user.userId); // Assuming PropelAuth provides `userId`
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const data = userDoc.data();

            const totalCaloriesIntake = data.nutrition.reduce((sum, item) => {
              return sum + parseFloat(item.calories || 0);
            }, 0);

            let totalCaloriesBurned = 0;
            let totalWorkoutDuration = 0;

            data.sets.forEach(set => {
              totalCaloriesBurned += parseFloat(set.caloriesBurned || 0);
              totalWorkoutDuration += parseFloat(set.duration || 0);
            });

            setTotalCaloriesIntake(totalCaloriesIntake);
            setTotalCaloriesBurned(totalCaloriesBurned);
            setTotalWorkoutDuration(totalWorkoutDuration);
          } else {
            console.log("No user data found!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [isLoggedIn, user]);

  const handleLogout = () => {
    logout(false); // Use the logout function from PropelAuth
  };

  const calorieSurplusOrDeficit = totalCaloriesIntake - totalCaloriesBurned;
  const potentialWeightChange = calorieSurplusOrDeficit / 3500;

  const chartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Projected Weight Gain (lbs)",
        data: [0, potentialWeightChange * 2, potentialWeightChange * 3, potentialWeightChange * 4],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
      {
        label: "Projected Weight Loss (lbs)",
        data: [0, -potentialWeightChange * 3, -potentialWeightChange * 3.5, -potentialWeightChange * 4.5],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-8 w-full bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          {isLoggedIn && (
            <button onClick={handleLogout} className="text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
              Logout
            </button>
          )}
        </header>
        
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 transform transition hover:scale-105">
            <FaUtensils className="text-4xl text-green-500" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Total Calorie Intake</h2>
              <p className="text-3xl font-bold text-gray-900">{totalCaloriesIntake} kcal</p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 transform transition hover:scale-105">
            <FaBurn className="text-4xl text-red-500" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Total Calories Burned</h2>
              <p className="text-3xl font-bold text-gray-900">{totalCaloriesBurned} kcal</p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 transform transition hover:scale-105">
            <FaClock className="text-4xl text-blue-500" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Total Workout Duration</h2>
              <p className="text-3xl font-bold text-gray-900">{totalWorkoutDuration} mins</p>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 transform transition hover:scale-100 h-full grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-300 shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Projected Weight Gain</h2>
            <Line data={chartData} options={{ responsive: true }} />
          </div>
          <div className="bg-gray-300 shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Projected Weight Loss</h2>
            <Line data={chartData} options={{ responsive: true }} />
          </div>
        </section>
      </main>
    </div>
  );
}
