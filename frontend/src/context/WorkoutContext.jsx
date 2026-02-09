import React, { createContext, useState, useContext } from 'react';

const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const [workout, setWorkout] = useState([]);

  const addToWorkout = (exercise) => {
    setWorkout((prev) => {
      if (prev.find(item => item.id === exercise.id)) {
        alert("This exercise is already in your workout.");
        return prev;
      }
      return [...prev, exercise];
    });
  };

  const removeFromWorkout = (id) => {
    setWorkout(prev => prev.filter(item => item.id !== id));
  };

  return (
    <WorkoutContext.Provider value={{ workout, addToWorkout, removeFromWorkout }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => useContext(WorkoutContext);