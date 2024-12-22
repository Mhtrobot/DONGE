import express from 'express';
import { protectUser } from '../middlewares/auth';
import { addGroup, deleteGroup, getOwenedGroup, getOwenedGroups, updateGroup } from '../controllers/groupControllers';
import { body } from 'express-validator';

const router = express.Router();

router.use(protectUser);

router.get('/', getOwenedGroups);
router.get('/:groupId', getOwenedGroup);

router.post('/create', 
    body('name').isString(), body('description').isString(),
    addGroup
);

router.put('/update/:groupId', 
    body('name').isString(), body('description').isString(),
    updateGroup
);

router.delete('/delete/:groupId', deleteGroup);

export default router;