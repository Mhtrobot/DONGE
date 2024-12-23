import express from 'express';
import { protectUser } from '../middlewares/auth';
import { getMembers, leaveGroup, removeMember, updateAdminStatus } from '../controllers/groupMemberControllers';
import { body } from 'express-validator';

const router = express.Router();

router.use(protectUser);

router.get('/:groupId', getMembers);

router.put('/update-admin/:groupId/:targetUserId', 
    body('isAdmin').isBoolean(),
    updateAdminStatus
);

router.delete('/remove/:groupId/:targetUserId', removeMember);
router.delete('/leave/:groupId', leaveGroup);

export default router;