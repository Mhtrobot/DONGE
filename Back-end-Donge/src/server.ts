import express from "express";
import cors from "cors";
import session from "express-session";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.get("/", (req, res) => {
    res.send("Hello World!");
})

export default app;