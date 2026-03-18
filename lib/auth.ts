import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const verifyToken = async () => {

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return null;
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET!);

        return decoded;

    } catch (error) {

        return null;

    }
};