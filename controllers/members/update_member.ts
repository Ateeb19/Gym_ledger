import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export const update_memeber = async (
    member_id: number,
    body: any
) => {
    const admin = await verifyToken();

    if (!admin) {
        return {
            success: false,
            msg: "Unauthorized"
        };
    }

    const allowedFields: any = {
        name: "full_name",
        email: "email",
        contact: "contact",
        emergency_contact: "emergency_contact",
        height: "height",
        weight: "weight",
        fitness_goal: "fitness_goal",
        personal_training: "personal_training",
        assign_trainer: "assign_trainer",
        medical_condition: "medical_condition"
    };

    let updates: string[] = [];
    let values: any[] = [];

    for (const key in body) {
        if (allowedFields[key] !== undefined && body[key] !== undefined) {

            if (key === "personal_training") {
                updates.push(`${allowedFields[key]} = ?`);
                values.push(body[key] ? 1 : 0);
            } else {
                updates.push(`${allowedFields[key]} = ?`);
                values.push(body[key]);
            }
        }
    }

    if (updates.length === 0) {
        return {
            success: false,
            msg: "No fields to update"
        };
    }

    const query = `
        UPDATE members_list 
        SET ${updates.join(", ")} 
        WHERE id = ? AND created_by_id = ?
    `;

    values.push(member_id, admin.id);

    const [result]: any = await db.query(query, values);

    if (result.affectedRows === 0) {
        return {
            success: false,
            msg: "Member not found or no changes made"
        };
    }

    return {
        success: true,
        msg: "Member updated successfully"
    };
};