/**
 * @swagger
 * /api/members/update_member/{id}:
 *   patch:
 *     summary: Update member (partial update)
 *     description: Update only the provided fields of a member. Fields not sent will remain unchanged.
 *     tags:
 *       - Members
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Member ID to update
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               contact:
 *                 type: string
 *                 example: "9876543210"
 *               emergency_contact:
 *                 type: string
 *                 example: "9123456780"
 *               height:
 *                 type: number
 *                 format: float
 *                 example: 175.5
 *               weight:
 *                 type: number
 *                 format: float
 *                 example: 70.2
 *               fitness_goal:
 *                 type: string
 *                 example: Weight Loss
 *               personal_training:
 *                 type: boolean
 *                 example: true
 *               assign_trainer:
 *                 type: string
 *                 example: Trainer Name
 *               medical_condition:
 *                 type: string
 *                 example: None
 *     responses:
 *       200:
 *         description: Member updated successfully
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
 *                   example: Member updated successfully
 *       400:
 *         description: Invalid input or no fields provided
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Member not found
 *       500:
 *         description: Server error
 */
import { NextResponse } from "next/server";
import { update_memeber } from "@/controllers/members/update_member";
import { withCors, corsHeaders } from "@/lib/cors";

export async function OPTIONS() {
    return new Response(null, {
        status: 200,
        headers: corsHeaders,
    });
}

export async function PATCH(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;

        if (!id || isNaN(Number(id))) {
            return withCors(
                NextResponse.json(
                    { success: false, msg: "Invalid ID" },
                    { status: 400 }
                )
            );
        }

        const body = await req.json();

        if (!body || Object.keys(body).length === 0) {
            return withCors(
                NextResponse.json(
                    { success: false, msg: "No fields provided" },
                    { status: 400 }
                )
            );
        }

        const result = await update_memeber(Number(id), body);

        return withCors(
            NextResponse.json(result, {
                status: result.success ? 200 : 400
            })
        );

    } catch (error) {
        return withCors(
            NextResponse.json(
                { success: false, msg: "Server error" },
                { status: 500 }
            )
        );
    }
}