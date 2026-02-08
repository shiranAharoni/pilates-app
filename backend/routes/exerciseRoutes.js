import express from 'express';
import { 
    getExercisesByPosition, 
    getAllExercises, 
    addExercise, 
    deleteExercise,
    updateExercise
} from '../controllers/exerciseController.js';

const router = express.Router();


router.get('/', getAllExercises);
router.get('/position/:position', getExercisesByPosition);
router.post('/', addExercise);
router.delete('/:id', deleteExercise);
router.put('/:id', updateExercise);

export default router;