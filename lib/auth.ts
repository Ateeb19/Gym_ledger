// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";

// export const verifyToken = async () => {

//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;

//     if (!token) {
//         return null;
//     }

//     try {

//         const decoded = jwt.verify(token, process.env.JWT_SECRET!);

//         return decoded;

//     } catch (error) {

//         return null;

//     }
// };

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

type AdminToken = {
    id: number;
    email: string;
};

export const verifyToken = async (): Promise<AdminToken | null> => {

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return null;
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AdminToken;

        return decoded;

    } catch (error) {
        return null;
    }
};