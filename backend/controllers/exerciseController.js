import pool from '../config/db.js';

export const getExercisesByPosition = async (req, res) => {
  const { position } = req.params; 
  try {
    const result = await pool.query(
      'SELECT * FROM pilates_exercises WHERE position = $1 ORDER BY id ASC',
      [position]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching exercises by position:', err.message);
    res.status(500).json({ error: 'Server error while fetching exercises' });
  }
};

export const getAllExercises = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pilates_exercises ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching all exercises:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

export const addExercise = async (req, res) => {
  const { title, description, position, video_url } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO pilates_exercises (title, description, position, video_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, position, video_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding exercise:', err.message);
    res.status(500).json({ error: 'Server error while adding exercise' });
  }
};

export const deleteExercise = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM pilates_exercises WHERE id = $1', [id]);
    res.status(200).json({ message: 'Exercise deleted successfully' });
  } catch (err) {
    console.error('Error deleting exercise:', err.message);
    res.status(500).json({ error: 'Server error while deleting exercise' });
  }
};

export const updateExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, position, video_url } = req.body;

    const query = `
      UPDATE pilates_exercises 
      SET 
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        position = COALESCE($3, position),
        video_url = COALESCE($4, video_url)
      WHERE id = $5 
      RETURNING *`;

    const updatedExercise = await pool.query(query, [
      title || null, 
      description || null, 
      position || null, 
      video_url || null, 
      id
    ]);

    if (updatedExercise.rows.length === 0) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    res.json(updatedExercise.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};