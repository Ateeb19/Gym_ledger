/**
 * @swagger
 * /api/membership_plane/get:
 *   get:
 *     summary: Get all membership plans
 *     tags:
 *       - Membership Plan
 *     responses:
 *       200:
 *         description: Successfully fetched membership plans
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
 *                   example: Plans fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       p_id:
 *                         type: integer
 *                         example: 1
 *                       plan_name:
 *                         type: string
 *                         example: Gold Plan
 *                       plan_duration:
 *                         type: string
 *                         example: 3 Months
 *                       amount:
 *                         type: number
 *                         example: 1500
 *                       created_by_id:
 *                         type: integer
 *                         example: 2
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-03-20T10:00:00.000Z
 *       400:
 *         description: Failed to fetch plans
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Failed to fetch plans
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
import { NextResponse } from "next/server";
import { withCors, corsHeaders } from "@/lib/cors";
import { get_m_p } from "@/controllers/membership_plane/get_m_p";

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
        const result = await get_m_p();

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

    } catch (error) {
        return withCors(NextResponse.json(
            { msg: "Server error" },
            { status: 500 }
        ), origin)
    }
}