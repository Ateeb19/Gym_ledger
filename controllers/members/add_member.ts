import { verifyToken } from "@/lib/auth";
import { db } from "@/lib/db";

export const add_member = async (name: string, email: string, contact: string, emergency_contact: string, height: number, weight: number, fitness_goal: string, personal_training: boolean, assign_trainer: string, medical_condition: string, join_date: Date) => {

    const admin = await verifyToken();
    if (!admin) {
        return {
            success: false,
            msg: "Unauthorized"
        };
    }

    const training = personal_training ? 1 : 0;

    const [exist]: any = await db.query(
        `SELECT id FROM members_list WHERE created_by_id = ? AND email = ?`,
        [admin.id, email]
    )

    if (exist.length > 0) {
        return {
            success: false,
            msg: "Member email exist",
        }
    }

    await db.query(`
        INSERT INTO members_list (created_by_id, created_by_email, full_name, email, contact, emergency_contact, height, weight, fitness_goal, personal_training, assign_trainer, medical_condition, join_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            admin.id,
            admin.email,
            name,
            email,
            contact,
            emergency_contact,
            height,
            weight,
            fitness_goal,
            training,
            assign_trainer,
            medical_condition,
            join_date,
        ]
    );

    return{
        success: true,
        msg: "Member creted success",
    }
}