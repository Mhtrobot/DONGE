import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;
export const validateJWT = (token: string) => {
    try {
        const result = jwt.verify(token, SECRET);

        return result as {id: number};
    } catch (error) {
        return null;
    }
}