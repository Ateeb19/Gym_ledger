import { verifyToken } from "@/lib/auth";
import { db } from "@/lib/db";
import { normalize } from "@/lib/normalize"
export const update_m_p = async (id: number, body: any) => {

    const admin = await verifyToken();
    if (!admin) {
        return {
            success: false,
            msg: "Unauthorized"
        };
    }

    // const normalize_name = normalize(p_name)

    const allowedFields: any = {
        plan_name: "plan_name",
        normalized_name: "normalized_name",
        plan_duration: "plan_duration",
        amount: "amount"
    }

    let updates: string[] = [];
    let values: any[] = [];

    if (body.plan_name) {

        const normalizedName = normalize(body.plan_name);

        const [exist]: any = await db.query(
            `SELECT p_id FROM membership_plan 
             WHERE created_by_id = ? AND normalized_name = ? AND p_id != ?`,
            [admin.id, normalizedName, id]
        );

        if (exist.length > 0) {
            return {
                success: false,
                msg: "Plan already exists",
            };
        }

        updates.push("plan_name = ?");
        values.push(body.plan_name);

        updates.push("normalized_name = ?");
        values.push(normalizedName);
    }

    if (body.plan_duration !== undefined) {
        updates.push("plan_duration = ?");
        values.push(body.plan_duration);
    }

    if (body.amount !== undefined) {
        updates.push("amount = ?");
        values.push(body.amount);
    }

    if (updates.length === 0) {
        return {
            success: false,
            msg: "No fields to update"
        };
    }

    const query = `
        UPDATE membership_plan 
        SET ${updates.join(", ")} 
        WHERE p_id = ? AND created_by_id = ?
    `;

    values.push(id, admin.id);

    const [result]: any = await db.query(query, values);

    if (result.affectedRows === 0) {
        return {
            success: false,
            msg: "Plan not found or no changes made"
        };
    }

    return {
        success: true,
        msg: "Plan updated successfully"
    };
}