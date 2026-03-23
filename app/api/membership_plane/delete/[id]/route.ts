/**
 * @swagger
 * /api/membership_plane/delete/{id}:
 *   delete:
 *     summary: Delete a membership plan
 *     tags:
 *       - Membership Plan
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Membership Plan ID to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Plan deleted successfully
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
 *                   example: Plan deleted successfully
 *       400:
 *         description: Invalid ID or deletion failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   examples:
 *                     invalidId:
 *                       value: Invalid ID
 *                     notFound:
 *                       value: Plan not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
import { NextResponse } from "next/server";
import { withCors, corsHeaders } from "@/lib/cors";
import { delete_m_p } from "@/controllers/membership_plane/delete_m_p";

export async function OPTIONS(req: Request) {
    const origin = req.headers.get("origin");

    return new Response(null, {
        status: 200,
        headers: corsHeaders(origin),
    });
}

export async function DELETE(
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

        const result = await delete_m_p(Number(id));

        return withCors(NextResponse.json(result), origin);

    } catch (error) {
        return withCors(NextResponse.json(
            { msg: "Server error" },
            { status: 500 }
        ), origin);
    }
}
