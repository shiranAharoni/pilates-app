import React from 'react';
import { useWorkout } from '../../context/WorkoutContext'; 
import { Link } from 'react-router-dom';
import './WorkoutSession.css';

function WorkoutSession() {
  const { workout } = useWorkout(); 

  return (
    <div className="session-container">
      <Link to="/" className="back-link">← End Session</Link>
      <h1 className="session-title">Your Pilates Session</h1>

      {workout.length === 0 ? (
        <p>No exercises in your workout. Go back and add some!</p>
      ) : (
        <div className="session-list">
          {workout.map((ex, index) => (
            <div key={ex.id} className="session-item">
              <span className="exercise-number">{index + 1}</span>
              <div className="session-card">
                <h2>{ex.title}</h2>
                <p>{ex.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkoutSession;