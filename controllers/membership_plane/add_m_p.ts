import { verifyToken } from "@/lib/auth";
import { db } from "@/lib/db";
import { normalize } from "@/lib/normalize"
export const add_m_p = async (p_name: string, p_duration: string, amount: number) => {

    const admin = await verifyToken();
    if (!admin) {
        return {
            success: false,
            msg: "Unauthorized"
        };
    }

    const normalize_name = normalize(p_name)

    const [exist]: any = await db.query(
        `SELECT p_id FROM membership_plan WHERE created_by_id = ? AND normalized_name = ?`,
        [admin.id, normalize_name]
    )

    if (exist.length > 0) {
        return {
            success: false,
            msg: "Plan alrady exist",
        }
    }

    await db.query(`
        INSERT INTO membership_plan (plan_name, normalized_name, plan_duration, amount, created_by_id) VALUES (?, ?, ?, ?, ?)`,
        [p_name, normalize_name, p_duration, amount, admin.id]
    )

    return {
        success: true,
        msg: "Plan created successfully"
    };
}