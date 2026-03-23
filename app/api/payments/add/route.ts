/**
 * @swagger
 * /api/payments/add:
 *   post:
 *     summary: Add a new payment for a member
 *     tags:
 *       - Payments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plan_id
 *               - member_id
 *               - amount
 *               - discount_amount
 *               - payment_mode
 *               - payment_date
 *               - membership_expiry_date
 *             properties:
 *               plan_id:
 *                 type: number
 *                 example: 1
 *                 description: Must be a valid existing plan ID
 *               member_id:
 *                 type: number
 *                 example: 7
 *                 description: Must be a valid existing member ID
 *               amount:
 *                 type: number
 *                 example: 500
 *                 description: Paid amount (must be greater than 0)
 *               discount_amount:
 *                 type: number
 *                 example: 100
 *                 description: Discount applied on plan amount
 *               payment_mode:
 *                 type: string
 *                 example: Cash
 *               payment_date:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-03-23T10:30:00.000Z
 *               membership_expiry_date:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-06-23T10:30:00.000Z
 *     responses:
 *       200:
 *         description: Payment added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Payment added successfully
 *       400:
 *         description: Validation error or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   examples:
 *                     required:
 *                       value: All fields are required
 *                     zeroAmount:
 *                       value: Amount cannot be 0
 *                     invalidPlan:
 *                       value: Invalid plan id. Plan does not exist.
 *                     invalidMember:
 *                       value: Invalid member id. Member does not exist.
 *                     discountError:
 *                       value: Discount cannot be greater than plan amount
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

import { NextResponse } from "next/server";
import { withCors, corsHeaders } from "@/lib/cors";
import { add_payment } from "@/controllers/payments/add_payment";

export async function OPTIONS(req: Request) {
    const origin = req.headers.get("origin");

    return new Response(null, {
        status: 200,
        headers: corsHeaders(origin),
    });
}

export async function POST(req: Request) {
    const origin = req.headers.get("origin");
    try {
        const body = await req.json();

        const { plan_id, member_id, amount, discount_amount, payment_mode, payment_date, membership_expiry_date } = body;

        if (plan_id === undefined || member_id === undefined || amount === undefined || discount_amount === undefined || !payment_mode || !payment_date || !membership_expiry_date) {
            return withCors(NextResponse.json(
                { success: false, msg: "All fields are required" },
                { status: 400 }
            ),origin);
        }

        if (amount === 0) {
            return withCors(NextResponse.json(
                { success: false, msg: "Amount cannot be 0" },
                { status: 400 }
            ),origin);
        }
        const result = await add_payment(plan_id, member_id, amount, discount_amount, payment_mode, payment_date, membership_expiry_date);

        if (!result.success) {
            return withCors(NextResponse.json(
                { success: result.success, msg: result.msg, },
                { status: 400 },
            ),origin)
        }

        const response = NextResponse.json(
            {
                success: result.success,
                msg: result.msg
            },
            { status: 200 }
        )

        return withCors(response,origin);

    } catch (error) {
        return withCors(NextResponse.json(
            { msg: "Server error" },
            { status: 500 }
        ),origin)
    }
}
