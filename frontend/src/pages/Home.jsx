import { Link } from 'react-router-dom';
import '../Home.css';

const POSITIONS = [
  { id: 'standing', label: 'Standing' },
  { id: 'balance', label: 'Balance' },
  { id: 'full-body', label: 'Full Body Integration' },
  { id: 'overhead', label: 'Legs Overhead' }, // רגליים מעבר לראש
  { id: 'seated', label: 'Seated' },
  { id: 'side-lying', label: 'Side Lying' },
  { id: 'prone', label: 'Prone' },
  { id: 'supine', label: 'Supine' },
  { id: 'all', label: 'All Exercises' }
];

function Home() {
  return (
    <div className="home-container">
      <h1>PILATES REPERTOIRE</h1>
      <p>Select a category to explore exercises</p>

      <Link to="/add-exercise">
        <button className="add-main-btn">+ Add New Exercise</button>
      </Link>
      
      <div className="positions-grid">
        {POSITIONS.map((pos) => (
          <Link key={pos.id} to={`/exercises/${pos.id}`} className="card-link">
            <button className="position-card">
              {pos.label}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;