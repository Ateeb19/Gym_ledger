/**
 * @swagger
 * /api/members/member_detail/{id}:
 *   get:
 *     summary: Get member details by ID
 *     description: Fetch a single member's details using their unique ID
 *     tags:
 *       - Members
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Member ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Member details fetched successfully
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
 *                   example: Member fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: john@example.com
 *                     contact:
 *                       type: string
 *                       example: "9876543210"
 *                     emergency_contact:
 *                       type: string
 *                       example: "9123456780"
 *                     height:
 *                       type: number
 *                       format: float
 *                       example: 175.5
 *                     weight:
 *                       type: number
 *                       format: float
 *                       example: 70.2
 *                     fitness_goal:
 *                       type: boolean
 *                       example: true
 *                     personal_training:
 *                       type: boolean
 *                       example: false
 *                     medical_condition:
 *                       type: string
 *                       example: None
 *                     join_date:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-03-10T10:00:00.000Z
 *       400:
 *         description: Invalid ID supplied
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Member not found
 *       500:
 *         description: Internal server error
 */
import { NextResponse } from "next/server";
import { member_detail } from "@/controllers/members/member_detail";
import { withCors, corsHeaders } from "@/lib/cors";

export async function OPTIONS(req: Request) {
    const origin = req.headers.get("origin");

    return new Response(null, {
        status: 200,
        headers: corsHeaders(origin),
    });
}

export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const origin = req.headers.get("origin");

    try {
        const { id } = await context.params;

        if (!id || isNaN(Number(id))) {
            return withCors(NextResponse.json(
                { msg: "Invalid ID" },
                { status: 400 }
            ), origin);
        }

        const result = await member_detail(Number(id));

        return withCors(NextResponse.json(result), origin);

    } catch (error) {
        return withCors(NextResponse.json(
            { msg: "Server error" },
            { status: 500 }
        ), origin);
    }
}