import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ExerciseList from './pages/ExerciseList';
import AddExercise from './pages/AddExercise';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* כאן נוכל להוסיף Navbar בהמשך */}
        <Routes>
          {/* דף הבית */}
          <Route path="/" element={<Home />} />
          
          {/* דף רשימת תרגילים לפי מנח - שימי לב ל- :position הדינמי */}
          <Route path="/exercises/:position" element={<ExerciseList />} />

          <Route path="/add-exercise" element={<AddExercise />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;