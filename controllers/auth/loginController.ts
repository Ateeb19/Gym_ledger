import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (email: string, password: string) => {

    const [exist] : any = await db.query(
        `SELECT * FROM users WHERE email = ?`,
        [email]
    );

    if(exist.length < 0){
        return{
            success: false,
            msg: "Email or password is wrong",
        }
    }

    const user = exist[0];

    const hashPassword = await bcrypt.compare(password, user.password);

    if(!hashPassword){
        return{
            success: false,
            msg: "Email or password is wrong",
        }
    }

    const token = jwt.sign(
        {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "1d"
        }
    );

    return {
        success: true,
        msg: "Login successful",
        token: token,
        user: {
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
}