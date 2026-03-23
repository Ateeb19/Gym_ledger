/**
 * @swagger
 * /api/membership_plane/update/{id}:
 *   patch:
 *     summary: Update a membership plan (partial update allowed)
 *     tags:
 *       - Membership Plan
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Membership Plan ID to update
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
 *               plan_name:
 *                 type: string
 *                 example: Gold Plan
 *               plan_duration:
 *                 type: string
 *                 example: 6 Months
 *               amount:
 *                 type: number
 *                 example: 2500
 *             description: Provide any fields you want to update
 *     responses:
 *       200:
 *         description: Plan updated successfully
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
 *                   example: Plan updated successfully
 *       400:
 *         description: Invalid input or update failed
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
 *                     invalidId:
 *                       value: Invalid ID
 *                     noFields:
 *                       value: No fields provided
 *                     duplicate:
 *                       value: Plan already exists
 *                     notFound:
 *                       value: Plan not found or no changes made
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
import { NextResponse } from "next/server";
import { withCors, corsHeaders } from "@/lib/cors";
import { update_m_p } from "@/controllers/membership_plane/update_m_p";

export async function OPTIONS(req: Request) {
    const origin = req.headers.get("origin");

    return new Response(null, {
        status: 200,
        headers: corsHeaders(origin),
    });
}

export async function PATCH(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const origin = req.headers.get("origin");

    try {
        const { id } = await context.params;

        if (!id || isNaN(Number(id))) {
            return withCors(
                NextResponse.json(
                    { success: false, msg: "Invalid ID" },
                    { status: 400 }
                ), origin
            );
        }

        const body = await req.json();

        if (!body || Object.keys(body).length === 0) {
            return withCors(
                NextResponse.json(
                    { success: false, msg: "No fields provided" },
                    { status: 400 }
                ), origin
            );
        }

        const result = await update_m_p(Number(id), body);

        return withCors(
            NextResponse.json(result, {
                status: result.success ? 200 : 400
            }), origin
        );

    } catch (error) {
        return withCors(
            NextResponse.json(
                { success: false, msg: "Server error" },
                { status: 500 }
            ), origin
        );
    }
}