import express from "express";
import {body} from "express-validator";
import {sendOTP, setPassword, verifyOTP} from "../controllers/authControllers";
import {protectUser} from "../middlewares/auth";

const router = express.Router();

router.post('/send-otp', body('phone').isString(), sendOTP);
router.post('/verify-otp', body('phone').isString(), body('code').isString(), verifyOTP );
router.post('/set-password', protectUser, body('password').isString(), setPassword);

export default router;
