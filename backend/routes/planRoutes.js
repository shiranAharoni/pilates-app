import express from 'express';
import { 
    createPlan, 
    getAllPlans, 
    addExerciseToPlan, 
    getPlanWithExercises,
    removeExerciseFromPlan 
} from '../controllers/planController.js';

const router = express.Router();


router.post('/', createPlan);
router.get('/', getAllPlans);
router.post('/add-exercise', addExerciseToPlan);
router.get('/:id', getPlanWithExercises);
router.delete('/:plan_id/exercise/:exercise_id', removeExerciseFromPlan);

export default router;