import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import ExerciseList from './pages/ExerciseList/ExerciseList';
import AddExercise from './pages/AddExercise/AddExercise';
import { WorkoutProvider } from './context/WorkoutContext';
import WorkoutSession from './pages/WorkoutSession/WorkoutSession';

function App() {
  return (
    <WorkoutProvider> {/* עוטף את הכל כדי שהמידע יישמר במעבר דפים */}
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exercises/:position" element={<ExerciseList />} />
            <Route path="/add-exercise" element={<AddExercise />} />
            <Route path="/session" element={<WorkoutSession />} />
          </Routes>
        </div>
      </Router>
    </WorkoutProvider>
  );
}

export default App;