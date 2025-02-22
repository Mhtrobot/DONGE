import 'reflect-metadata';
import './container';
import dotenv from "dotenv";
dotenv.config();
import app from "./server";

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});