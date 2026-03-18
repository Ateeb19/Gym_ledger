import { verifyToken } from "@/lib/auth";
import { db } from "@/lib/db";

export const member_detail = async (member_id: number) => {
    const admin = await verifyToken();

    if (!admin) {
        return {
            success: false,
            msg: "Unauthorized"
        };
    }

    const [rows]: any = await db.query(`
        SELECT id, full_name, email, contact, emergency_contact, height, weight, fitness_goal, personal_training, assign_trainer, medical_condition, plan_id, join_date, status FROM members_list WHERE id = ? AND created_by_id = ?`,
        [member_id, admin.id]
    )


    if (rows.length <= 0) {
        return {
            success: false,
            msg: "Member not found",
        }
    }

    return {
        success: true,
        msg: "Member details",
        data: rows,
    }
}