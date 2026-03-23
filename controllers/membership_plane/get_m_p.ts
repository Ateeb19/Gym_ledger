import { verifyToken } from "@/lib/auth";
import { db } from "@/lib/db";

export const get_m_p = async () => {
    const admin = await verifyToken();
    if (!admin) {
        return {
            success: false,
            msg: "Unauthorized"
        };
    }

     const [rows]: any = await db.query(
        `SELECT * FROM membership_plan WHERE created_by_id = ?`,
        [admin.id]
    )

     if (rows.length <= 0) {
        return {
            success: true,
            msg: "No plan found",
            data: []
        };
    }
    return {
        success: true,
        msg: "Plan fetched successfully",
        data: rows
    }
}