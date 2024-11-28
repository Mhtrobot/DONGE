import express from "express";
import {body} from "express-validator";
import {loginWithPassword, sendOTP, validate, verifyOTP} from "../controllers/authControllers";
import {protectUser} from "../middlewares/auth";

const router = express.Router();

router.post('/send-otp', body('phone').isString(), sendOTP);
router.post('/verify-otp', body('phone').isString(), body('code').isString(), verifyOTP );
router.get('/validate', protectUser, validate);
router.post('/login-with-password', body('phone').isString(), body('password').isString(), loginWithPassword);

export default router;
