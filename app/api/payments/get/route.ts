/**
 * @swagger
 * /api/payments/get:
 *   get:
 *     summary: Get all payments
 *     tags:
 *       - Payments
 *     responses:
 *       200:
 *         description: Payments fetched successfully
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
 *                   example: Payments fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       payment_id:
 *                         type: number
 *                         example: 1
 *                       plan_id:
 *                         type: number
 *                         example: 1
 *                       member_id:
 *                         type: number
 *                         example: 7
 *                       amount:
 *                         type: number
 *                         example: 500
 *                       amount_remaining:
 *                         type: number
 *                         example: 200
 *                       discount_amount:
 *                         type: number
 *                         example: 100
 *                       payment_mode:
 *                         type: string
 *                         example: Cash
 *                       payment_date:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-03-23T10:30:00.000Z
 *                       membership_expiry_date:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-06-23T10:30:00.000Z
 *                       status:
 *                         type: number
 *                         example: 1
 *       400:
 *         description: Failed to fetch payments
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
 *                   example: Failed to fetch payments
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

import { NextResponse } from "next/server";
import { withCors, corsHeaders } from "@/lib/cors";
import { get_payment } from "@/controllers/payments/get_payment";

export async function OPTIONS(req: Request) {
    const origin = req.headers.get("origin");

    return new Response(null, {
        status: 200,
        headers: corsHeaders(origin),
    });
}

export async function GET(req: Request) {
    const origin = req.headers.get("origin");
    try {
        const result = await get_payment();

        if (!result.success) {
            return withCors(NextResponse.json(
                { success: result.success, msg: result.msg },
                { status: 400 }
            ), origin);
        }
        return withCors(NextResponse.json(
            {
                success: result.success,
                msg: result.msg,
                data: result.data,
            },
            { status: 200 }
        ), origin)

    } catch {
        return withCors(NextResponse.json(
            { msg: "Server error" },
            { status: 500 }
        ), origin)
    }
}