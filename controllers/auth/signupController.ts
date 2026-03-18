import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const signup = async (name: string, email: string, password: string) => {
    const [existing] : any  = await db.query(
        `SELECT id FROM users WHERE email = ?`,
        [email]
    );

    if(existing.length > 0){
        return{
            success: false,
            msg: "Email already exiest",
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
        `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
        [name, email, hashedPassword],
    );

    return{
        success: true,
        msg: "User registered",
    };
}