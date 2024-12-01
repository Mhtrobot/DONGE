import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyparser from 'body-parser';

import proxy from 'express-http-proxy'

dotenv.config();


let app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`DOCS: <a href="${process.env.BASE_URL}/IAM/docs/#"><b>IAM Service</b></a> 
    | <a href="${process.env.BASE_URL}/MEDIA/docs/#"><b>Media Service</b></a> 
    | <a href="${process.env.BASE_URL}/CORE/docs/#"><b>CORE Service</b></a>`);
});

const IAM = process.env.IAM_SERVICE_URL || 'http://127.0.0.1:4568';
const MEDIA = process.env.MEDIA_SERVICE_URL || 'http://127.0.0.1:4569';
const CORE = process.env.CORE_SERVICE_URL || 'http://127.0.0.1:4570';

const customProxy = (url: string, options?: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        let content_type = req.headers['content-type'];

        if (content_type && content_type.includes('multipart/form-data')) {
            proxy(url, {
                ...options,
                parseReqBody: false
            })(req, res, next);
        } else {
            proxy(url, {
                ...options
            })(req, res, next);
        }
    }
}

app.use('/IAM', customProxy(IAM));
app.use('/MEDIA', customProxy(MEDIA));
app.use('/CORE', customProxy(CORE));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});