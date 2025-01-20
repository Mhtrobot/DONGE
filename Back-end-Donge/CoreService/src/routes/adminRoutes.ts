import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { body } from 'express-validator';
import { generateAdminJWT } from '../core/JWT';
import { protectAdmin } from '../middlewares/auth';
import { AdminAuthenticatedReq } from '../interfaces/AuthenticatedRequest.ts';
import db from '../utils/db';

const router = express.Router();

router.post('/login', 
    body('username').isString(),
    body('password').isString(),
    (req, res) => {
        const { username, password } = req.body;
        const data = {
            username: process.env.ADMIN_USERNAME,
            password: process.env.ADMIN_PASSWORD
        }

        if (username !== data.username || password !== data.password) {
            res.status(401).json({
                message: "INVALID CREDENTIALS❌"
            });
            return;
        }

        const token = generateAdminJWT(username);

        res.json({
            token,
            token_type: "Bearer",
        });
    }
);

router.get('/me', protectAdmin, (req: AdminAuthenticatedReq, res) => {
    res.json({
        username: req.admin.username,
    });
});

router.get('/users', protectAdmin, async (req: AdminAuthenticatedReq, res) => {
    try {
        const users = await db.users.findMany({
            select: {
                id: true,
                name: true,
                phone: true,
                owes: true,
                debts: true,
                createdAt: true,
            }
        });

        // Convert BigInt to string
        const serializedUsers = users.map(user => ({
            ...user,
            owes: user.owes.toString(),
            debts: user.debts.toString()
        }));

        res.json(serializedUsers);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            success: false,
            message: "خطا در دریافت لیست کاربران ❌"
        });
    }
});


router.get('/groups', protectAdmin, async (req: AdminAuthenticatedReq, res) => {
    try {
        const groups = await db.groups.findMany({
            select: {
                id: true,
                name: true,
                userId: true,
                createdAt: true,
            },
        });

        res.json(groups);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            success: false,
            message: "خطا در دریافت لیست گروه ها ❌"
        });
    }
});

export default router;