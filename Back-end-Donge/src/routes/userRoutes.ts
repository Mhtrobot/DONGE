import express from "express";
import {protectUser} from "../middlewares/auth";
import {body} from "express-validator";
import {getUser, setName, setPassword} from "../controllers/userControllers";


const router = express.Router();

router.get("/", protectUser, getUser);
router.post('/set-name', protectUser, body('name').isString(), setName);
router.post('/set-password', protectUser, body('password').isString(), setPassword);

export default router;