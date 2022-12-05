import { Router } from 'express';
import { getChoice, getPoll, getResult, postChoice, postPoll, postVote } from '../controllers/userController.js';



const router = Router();

router.post('/poll', postPoll)
router.get('/poll', getPoll)
router.post('/choice', postChoice)
router.get('/poll/:id/choice',getChoice)
router.post('/choice/:id/vote', postVote)
router.get('/poll/:id/result',getResult)




export default router;