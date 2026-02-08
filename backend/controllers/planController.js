import pool from '../config/db.js';

export const createPlan = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO workout_plans (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating plan:', err.message);
    res.status(500).json({ error: 'Server error while creating plan' });
  }
};

export const getAllPlans = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM workout_plans ORDER BY id DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching plans:', err.message);
    res.status(500).json({ error: 'Server error while fetching plans' });
  }
};

export const addExerciseToPlan = async (req, res) => {
  const { plan_id, exercise_id } = req.body;
  try {
    const maxIndexResult = await pool.query(
      'SELECT COALESCE(MAX(order_index), -1) as max_index FROM plan_exercises WHERE plan_id = $1',
      [plan_id]
    );
    
    const nextIndex = maxIndexResult.rows[0].max_index + 1;

    const result = await pool.query(
      'INSERT INTO plan_exercises (plan_id, exercise_id, order_index) VALUES ($1, $2, $3) RETURNING *',
      [plan_id, exercise_id, nextIndex]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding exercise to plan:', err.message);
    res.status(500).json({ error: 'Server error while adding exercise to plan' });
  }
};


export const getPlanWithExercises = async (req, res) => {
  const { id } = req.params; 
  try {
    const query = `
      SELECT pe.order_index, e.* FROM plan_exercises pe
      JOIN pilates_exercises e ON pe.exercise_id = e.id
      WHERE pe.plan_id = $1
      ORDER BY pe.order_index ASC
    `;
    const result = await pool.query(query, [id]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching plan exercises:', err.message);
    res.status(500).json({ error: 'Server error while fetching plan details' });
  }
};

export const removeExerciseFromPlan = async (req, res) => {
  const { plan_id, exercise_id } = req.params;
  try {
    await pool.query(
      'DELETE FROM plan_exercises WHERE plan_id = $1 AND exercise_id = $2',
      [plan_id, exercise_id]
    );
    res.status(200).json({ message: 'Exercise removed from plan successfully' });
  } catch (err) {
    console.error('Error removing exercise from plan:', err.message);
    res.status(500).json({ error: 'Server error while removing exercise from plan' });
  }
};