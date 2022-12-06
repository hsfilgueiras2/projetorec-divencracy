import { Router } from 'express';
import { getChoice, getPoll, getResult, postChoice, postPoll, postVote } from '../controllers/userController.js';
import { validateChoice } from '../middlewares/validateChoice.js';
import { validatePoll } from '../middlewares/validatePoll.js';
import { validateVote } from '../middlewares/validateVote.js';


const router = Router();

router.post('/poll',validatePoll, postPoll)
router.get('/poll', getPoll)
router.post('/choice',validateChoice, postChoice)
router.get('/poll/:id/choice',getChoice)
router.post('/choice/:id/vote',validateVote, postVote)
router.get('/poll/:id/result',getResult)




export default router;