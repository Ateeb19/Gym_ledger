/**
 * @swagger
 * /api/membership_plane/add:
 *   post:
 *     summary: Create a new membership plan
 *     tags:
 *       - Membership Plan
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plan_name
 *               - plan_duration
 *               - amount
 *             properties:
 *               plan_name:
 *                 type: string
 *                 example: Gold Plan
 *               plan_duration:
 *                 type: string
 *                 example: 3 Months
 *               amount:
 *                 type: number
 *                 example: 1500
 *                 description: Must be greater than 0
 *     responses:
 *       200:
 *         description: Plan created successfully
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
 *                   example: Plan created successfully
 *       400:
 *         description: Validation error or duplicate plan
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
 *                       value: Amount can not be 0
 *                     duplicate:
 *                       value: Plan already exists
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
import { NextResponse } from "next/server";
import { withCors, corsHeaders } from "@/lib/cors";
import { add_m_p } from "@/controllers/membership_plane/add_m_p";

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

        const { plan_name, plan_duration, amount } = body;

        if (!plan_name || !plan_duration || amount === undefined) {
            if (amount === 0) {
                return withCors(NextResponse.json(
                    { success: false, msg: "Amount can not be 0" },
                    { status: 400 }
                ),origin);
            }
            return withCors(NextResponse.json(
                { success: false, msg: "All fields are required" },
                { status: 400 }
            ),origin);
        }

        const result = await add_m_p(plan_name, plan_duration, amount);

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