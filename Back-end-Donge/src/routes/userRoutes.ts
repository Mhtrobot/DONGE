import express from "express";
import {protectUser} from "../middlewares/auth";
import {body} from "express-validator";
import {changePhoneRequest, getUser, setName, setPassword} from "../controllers/userControllers";


const router = express.Router();

router.get("/", protectUser, getUser);
router.post('/set-name', protectUser, body('name').isString(), setName);
router.post('/set-password', protectUser, body('password').isString(), setPassword);
router.post('/change-phone-request', protectUser, body('password').isString(), body('newPhone').isString(), changePhoneRequest);

export default router;