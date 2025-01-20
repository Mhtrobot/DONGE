import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import mediaRoutes from './routes/mediaRoutes';


const app = express();  

app.use(cors());
app.use(express.json());

app.use('/media', mediaRoutes);

const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, 'swagger-output.json'), 'utf-8'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
    res.send("Hello World!");
})

export default app;