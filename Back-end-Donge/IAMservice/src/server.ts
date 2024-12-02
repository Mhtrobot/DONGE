import express from "express";
import cors from "cors";
import session from "express-session";
import fs from "fs";
import path from "path";
import swaggerUi from "swagger-ui-express";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(cors({
    origin: [
        'http://127.0.0.1:3001',
        'http://localhost:3001',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'https://dong.phaedra.ir',
        'http://dong.phaedra.ir',
    ], // Add your frontend URLs
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.use('/user-auth', authRoutes);
app.use('/user', userRoutes);

const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, 'swagger-output.json'), 'utf-8'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
    res.send("Hello World!");
})

export default app;