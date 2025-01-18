import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';


const app = express();  

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/media')
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((error) => {
        console.error(error);
    });

app.use(cors());
app.use(express.json());

const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, 'swagger-output.json'), 'utf-8'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
    res.send("Hello World!");
})

export default app;