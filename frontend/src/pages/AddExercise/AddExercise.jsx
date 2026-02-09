import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "./AddExercise.css";

function AddExercise() {
  // ניהול כל שדות הטופס באובייקט אחד
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    position: 'supine', // ברירת מחדל
    video_url: ''
  });

  const navigate = useNavigate();

  // פונקציה שמתעדכנת בכל שינוי בתיבות הטקסט
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // שליחת הנתונים לכתובת ה-POST שהכנו בשרת
      await axios.post('http://localhost:5000/exercises', formData);
      alert('Exercise added successfully!');
      navigate('/'); // מחזיר אותך לדף הבית אחרי ההוספה
    } catch (err) {
      console.error(err);
      alert('Error adding exercise. Make sure the server is running.');
    }
  };

  return (
    <div className="add-exercise-container">
      <Link to="/" className="back-link">← Back</Link>
      <h2>Add New Pilates Exercise</h2>
      
      <form onSubmit={handleSubmit} className="add-exercise-form">
        <input 
          type="text" 
          name="title"
          placeholder="Exercise Title (e.g., The Hundred)" 
          value={formData.title}
          onChange={handleChange}
          required 
        />
        
        <textarea 
          name="description"
          placeholder="Description and cues..." 
          value={formData.description}
          onChange={handleChange}
        />

        <select name="position" value={formData.position} onChange={handleChange}>
            <option value="standing">Standing</option>
            <option value="balance">Balance</option>
            <option value="full-body">Full Body Integration</option>
            <option value="overhead">Legs Overhead</option>
            <option value="seated">Seated</option>           
            <option value="side-lying">Side Lying</option>
            <option value="prone">Prone</option>
            <option value="supine">Supine</option>   
        </select>

        <input 
          type="text" 
          name="video_url"
          placeholder="YouTube Link (Regular or Shorts)" 
          value={formData.video_url}
          onChange={handleChange}
        />

        <button type="submit" className="save-btn">Save to Repertoire</button>
      </form>
    </div>
  );
}

export default AddExercise;