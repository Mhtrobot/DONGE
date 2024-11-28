import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export const generateJWT = (userId: number) => {
    if (!userId)
        return

    const payload = {
        id: userId,
    }

    const token = jwt.sign(payload, SECRET, {
        algorithm: "HS256",
        expiresIn: "48h",
    });

    return token;
}

export const validateJWT = (token: string) => {
    try {
        const result = jwt.verify(token, SECRET);

        return result as {id: number};
    } catch (error) {
        return null;
    }
}