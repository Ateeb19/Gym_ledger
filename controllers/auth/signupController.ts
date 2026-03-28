import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (name: string, email: string, contact: number, gym_name: string, password: string) => {
    const [existing]: any = await db.query(
        `SELECT id FROM users WHERE email = ?`,
        [email]
    );

    if (existing.length > 0) {
        return {
            success: false,
            msg: "Email already exiest",
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result]: any = await db.query(
        `INSERT INTO users (name, email, contact, gym_name, password) VALUES (?, ?, ?, ?, ?)`,
        [name, email, contact, gym_name, hashedPassword],
    );

    const userId = result.insertId;

    const token = jwt.sign(
        {
            id: userId,
            name,
            email,
            contact,
            gym_name,
            role: 0
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "1d"
        }
    );
    return {
        success: true,
        msg: "User registered",
        token: token,
        user: {
            name: name,
            email: email,
            contact: contact,
            gym_name: gym_name,
            role: 0
        }
    };
}