import express from "express";
import {body} from "express-validator";
import {sendOTP, verifyOTP} from "../controllers/authControllers";

const router = express.Router();

router.post('/send-otp', body('phone').isString(), sendOTP);
router.post('/verify-otp', body('phone').isString(), body('code').isString(), verifyOTP );

export default router;
