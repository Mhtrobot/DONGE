import express from 'express';
import multer from 'multer';
import { protectUser } from '../middlewares/auth';
import { getGroupProfile, getUserProfile, uploadGroupProfile, uploadUserProfile } from '../controllers/mediaControllers';

const router = express.Router();
const storage = multer.memoryStorage(); // Store in memory before sending to MongoDB
const upload = multer({ storage });

router.use(protectUser);

// Upload routes
router.post('/user/profile', upload.single('image'), uploadUserProfile);
router.post('/group/:groupId/profile', upload.single('image'), uploadGroupProfile);

// Get routes 
router.get('/user/profile', getUserProfile);
router.get('/group/:groupId/profile', getGroupProfile);

export default router;