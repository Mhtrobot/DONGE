import express from "express";
import cors from "cors";
import session from "express-session";
import fs from "fs";
import path from "path";
import swaggerUi from "swagger-ui-express";
import cardsRoutes from "./routes/cardsRoutes";
import groupRoutes from "./routes/groupRoutes";
import groupRequestRoutes from "./routes/groupRequestRoutes";
import groupMemberRoutes from "./routes/groupMemberRoutes";
import payDuesRoutes from "./routes/payDuesRoutes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.use('/cards', cardsRoutes);
app.use('/owenedGroups', groupRoutes);
app.use('/groupMember', groupMemberRoutes);
app.use('/groupRequest', groupRequestRoutes);
app.use('/payDues', payDuesRoutes);

const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, 'swagger-output.json'), 'utf-8'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
    res.send("Hello World!");
})

export default app;