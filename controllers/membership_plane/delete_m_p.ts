import { verifyToken } from "@/lib/auth";
import { db } from "@/lib/db";

export const delete_m_p = async (id: number) => {
    const admin = await verifyToken();
    if (!admin) {
        return {
            success: false,
            msg: "Unauthorized"
        };
    }

    const [result]: any = await db.query(`
         DELETE FROM membership_plan WHERE p_id = ? AND created_by_id = ?`,
        [id, admin.id]
    )

    if(result.affectedRows === 0){
         return {
            success: false,
            msg: "Plan not found or not authorized",
        };
    }

    return {
        success: true,
        msg: "Plan deleted success",
    }
}