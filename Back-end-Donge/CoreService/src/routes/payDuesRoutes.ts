import express from 'express';
import { protectUser } from '../middlewares/auth';
import { createPayDues, getPayDuesByGroupId, getPayDuesByUserId, updatePayDuesStatus } from '../controllers/payDuesControllers';
import { body } from 'express-validator';

const router = express.Router();

router.use(protectUser);

router.get('/', getPayDuesByUserId);

router.get('/:groupId', getPayDuesByGroupId);

router.post('/create',
    body('creditorId').isNumeric(),
    body('debtorId').isNumeric(),
    body('groupId').isNumeric(),
    body('cardId').isNumeric(),
    body('amount').isString(),
    body('currency').isString(),
    body('description').isString(),
    createPayDues
);

router.put('/update-status/:payDuesId', 
    body('status').isBoolean(),
    updatePayDuesStatus
);

router.delete('/delete/:payDuesId', updatePayDuesStatus);

export default router;