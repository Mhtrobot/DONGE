import express from 'express';
import { protectUser } from '../middlewares/auth';
import { body } from 'express-validator';
import { addCard, deleteCard, getCard, getCards } from '../controllers/cardsControllers';

const router = express.Router();

router.use(protectUser);

router.get('/', getCards);
router.get('/:cardId', getCard);

router.post('/add', 
    body('cardName').isString(), body('cardPan').isString(), 
    addCard
);

router.delete('/delete/:cardId', deleteCard);

export default router;