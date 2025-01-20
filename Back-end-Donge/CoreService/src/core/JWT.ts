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

export const generateAdminJWT = (username: string) => {
    if (!username)
        return

    const payload = {
        username: username,
    }

    const token = jwt.sign(payload, SECRET, {
        algorithm: "HS256",
        expiresIn: "48h",
    });

    return token;
}

export const validateAdminJWT = (token: string) => {
    try {
        const result = jwt.verify(token, SECRET);

        return result as {username: string};
    } catch (error) {
        return null;
    }
}