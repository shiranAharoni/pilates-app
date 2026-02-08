import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import initDB from './config/initDB.js'; 
import exerciseRoutes from './routes/exerciseRoutes.js';
import planRoutes from './routes/planRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

initDB();

app.use('/exercises', exerciseRoutes);
app.use('/plans', planRoutes);

app.get('/', (req, res) => {
  res.send('Pilates App Server is running!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});