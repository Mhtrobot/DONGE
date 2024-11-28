import express from "express";
import {body} from "express-validator";
import {loginWithPassword, sendOTP, validate, verifyOTP} from "../controllers/authControllers";
import {protectUser} from "../middlewares/auth";
import { phoneRegex } from "../core/regex";

const router = express.Router();

router.post('/send-otp', body('phone').isString().matches(phoneRegex), sendOTP);
router.post('/verify-otp', body('phone').isString().matches(phoneRegex), body('code').isString(), verifyOTP );
router.get('/validate', protectUser, validate);
router.post('/login-with-password', body('phone').isString().matches(phoneRegex), body('password').isString(), loginWithPassword);

export default router;
