import { verifyToken } from "@/lib/auth";
import { db } from "@/lib/db";

export const add_payment = async (plan_id: number, member_id: number, amount: number, discount_amount: number, payment_mode: string, payment_date: Date, membership_expiry_date: Date) => {

    const admin = await verifyToken();
    if (!admin) {
        return {
            success: false,
            msg: "Unauthorized"
        };
    }

    const [plan]: any = await db.query(
        "SELECT p_id, amount FROM membership_plan WHERE p_id = ?",
        [plan_id]
    );

    if (plan.length === 0) {
        return {
            success: false,
            msg: "Invalid plan id. Plan does not exist."
        };
    }

    const [member]: any = await db.query(
        "SELECT id FROM members_list WHERE created_by_id = ? AND id = ?",
        [admin.id, member_id]
    );

    if (member.length === 0) {
        return {
            success: false,
            msg: "Invalid member id. Member does not exist."
        };
    }

    const plan_amount = Number(plan[0].amount);
    const paid_amount = Number(amount);
    const discount = Number(discount_amount);

    // const amount_remaining = (plan_amount - discount) - paid_amount;
    const amount_remaining = Math.max((plan_amount - discount) - paid_amount, 0);

    if (discount > plan_amount) {
        return {
            success: false,
            msg: "Discount cannot be greater than plan amount"
        };
    }

    if (paid_amount <= 0) {
        return {
            success: false,
            msg: "Amount must be greater than 0"
        };
    }

    const formatDate = (date: Date | string) =>
        new Date(date).toISOString().slice(0, 19).replace("T", " ");

    const [result]: any = await db.query(`
        INSERT INTO payments (created_by_id, plan_id, member_id, amount, amount_remaining, discount_amount, payment_mode, payment_date, membership_expiry_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            admin.id,
            plan_id,
            member_id,
            paid_amount,
            amount_remaining,
            discount,
            payment_mode,
            formatDate(payment_date),
            formatDate(membership_expiry_date),
            1
        ]
    )

    const payment_id = result.insertId;

    if (!payment_id) {
        return {
            success: false,
            msg: "Payment failed to insert"
        }
    }
    await db.query(`
        UPDATE members_list SET status = 1, plan_id = ${plan_id} WHERE id = ? AND created_by_id = ?`,
        [member_id, admin.id]
    );

    return {
        success: true,
        msg: "Payment added successfully"
    };
}