import express from 'express';
import { protectUser } from '../middlewares/auth';
import { acceptGroupRequest, createGroupRequest, deleteGroupRequest, getGroupRequests } from '../controllers/groupRequestControllers';
import { body } from 'express-validator';
import { phoneRegex } from '../core/regex';

const router = express.Router();

router.use(protectUser);

router.get('/', getGroupRequests);

router.post('/create', 
    body('groupId').isNumeric(), body('recieverPhone').isString().matches(phoneRegex),
    createGroupRequest
);

router.put('/accept/:requestId', 
    body('isAccepted').isBoolean(),
    acceptGroupRequest
);

router.delete('/delete/:requestId', deleteGroupRequest);

export default router;