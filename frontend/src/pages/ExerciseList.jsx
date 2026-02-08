import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../ExerciseList.css'; 

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  let videoId = null;
  if (url.includes('shorts/')) {
    videoId = url.split('shorts/')[1].split('?')[0];
  } else {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) videoId = match[2];
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
};

function ExerciseList() {
  const { position } = useParams();
  const [exercises, setExercises] = useState([]);
  const [workout, setWorkout] = useState([]); 
  const [expandedId, setExpandedId] = useState(null); // המשתנה ששולט מה פתוח

  const addToWorkout = (exercise) => {
    if (!workout.find(item => item.id === exercise.id)) {
      setWorkout([...workout, exercise]);
    } else {
      alert("This exercise is already in your workout.");
    }
  };

  // פונקציית הפתיחה והסגירה
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const baseUrl = 'http://localhost:5000'; 
        const fetchUrl = position === 'all' 
          ? `${baseUrl}/exercises` 
          : `${baseUrl}/exercises/position/${position}`;
        
        const response = await axios.get(fetchUrl);
        if (Array.isArray(response.data)) {
          setExercises(response.data);
        } else {
          setExercises([]);
        }
      } catch (error) {
        console.error('Error fetching exercises:', error);
        setExercises([]);
      }
    };
    fetchExercises();
  }, [position]);

  return (
    <div className="exercise-list-container">
      <Link to="/" className="back-link">← Back to Categories</Link>
      <h1 className="list-title">{position?.toUpperCase()} REPERTOIRE</h1>
      
      <div className="exercises-grid">
        {exercises.length > 0 ? (
          exercises.map((ex) => (
            <div key={ex.id} className={`exercise-card ${expandedId === ex.id ? 'active' : ''}`}>
              
              {/* חלק 1: ראש הכרטיסייה - תמיד גלוי */}
              <div className="card-header" onClick={() => toggleExpand(ex.id)}>
                <h3>{ex.title}</h3>
                <span className="arrow-icon">{expandedId === ex.id ? '▲' : '▼'}</span>
              </div>

              {/* חלק 2: תוכן הכרטיסייה - מותנה בזה שה-ID פתוח */}
              {expandedId === ex.id && (
                <div className="card-content">
                  <p className="description">{ex.description}</p>
                  
                  {ex.video_url && (
                    <div className="video-container">
                      <iframe
                        src={getYouTubeEmbedUrl(ex.video_url)} 
                        title={ex.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ border: 0 }}
                      ></iframe>
                    </div>
                  )}

                  <button 
                    className="add-to-workout-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // מונע מהקליק לסגור את הכרטיסייה
                      addToWorkout(ex);
                    }}>
                    + Add to Workout
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (        
          <p className="no-exercises">No exercises found for this category yet.</p>
        )}
      </div>

      {workout.length > 0 && (
        <div className="current-workout">
          <h2>My Workout ({workout.length})</h2>
          <div className="workout-tags">
            {workout.map((item, index) => (
              <span key={index} className="workout-tag">{item.title}</span>
            ))}
          </div>
          <button className="start-session-btn">Start Session</button>
        </div>
      )}
    </div>
  );
}

export default ExerciseList;