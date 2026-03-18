/**
 * @swagger
 * /api/members/get_member:
 *   get:
 *     summary: Get all members created by admin
 *     tags:
 *       - Members
 *     responses:
 *       200:
 *         description: Members fetched successfully
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
 *                   example: Members fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       full_name:
 *                         type: string
 *                         example: John Doe
 *                       email:
 *                         type: string
 *                         example: john@example.com
 *                       contact:
 *                         type: string
 *                         example: "9876543210"
 *                       emergency_contact:
 *                         type: string
 *                         example: "9123456789"
 *                       height:
 *                         type: number
 *                         example: 175
 *                       weight:
 *                         type: number
 *                         example: 70
 *                       fitness_goal:
 *                         type: string
 *                         example: Weight Loss
 *                       personal_training:
 *                         type: integer
 *                         example: 1
 *                       assign_trainer:
 *                         type: string
 *                         example: Trainer Name
 *                       medical_condition:
 *                         type: string
 *                         example: None
 *                       join_date:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-03-17T10:00:00Z
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
import { NextResponse } from "next/server";
import { get_member } from "@/controllers/members/get_member";

export async function GET() {

    try {
        const result = await get_member();
        
        return NextResponse.json(
            {
                success: result.success,
                msg: result.msg,
                data: result.data,
            },
            {status: 200}
        )

    } catch (error) {
        return NextResponse.json(
            { msg: "Server error" },
            { status: 500 }
        )
    }
}