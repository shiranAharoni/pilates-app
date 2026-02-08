import pool from './db.js';

const initDB = async () => {
  const createTablesQuery = `
    CREATE TABLE IF NOT EXISTS pilates_exercises (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        position VARCHAR(100) NOT NULL,
        video_url TEXT,
        is_favorite BOOLEAN DEFAULT FALSE
    );

    CREATE TABLE IF NOT EXISTS workout_plans (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS plan_exercises (
        id SERIAL PRIMARY KEY,
        plan_id INTEGER REFERENCES workout_plans(id) ON DELETE CASCADE,
        exercise_id INTEGER REFERENCES pilates_exercises(id) ON DELETE CASCADE,
        order_index INTEGER
    );
  `;

  try {
    await pool.query(createTablesQuery);
    console.log('✅ Database tables are ready');
  } catch (err) {
    console.error('❌ Error initializing database tables:', err.stack);
  }
};

export default initDB;