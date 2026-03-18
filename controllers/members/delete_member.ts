import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export const delete_member = async (member_id: number) => {

    const admin = await verifyToken();

    if (!admin) {
        return {
            success: false,
            msg: "Unauthorized"
        };
    }

    const [result]: any = await db.query(`
        DELETE FROM members_list WHERE id = ? AND created_by_id = ?`,
        [member_id, admin.id]
    );
    if (result.affectedRows === 0) {
        return {
            success: false,
            msg: "Member not found or not authorized",
        };
    }
    return {
        success: true,
        msg: "Member deleted success",
    }
}
