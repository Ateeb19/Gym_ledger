/**
 * @swagger
 * /api/members/delete_member/{id}:
 *   delete:
 *     summary: Delete a member
 *     tags:
 *       - Members
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Member ID to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Member deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *       400:
 *         description: Invalid ID or request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Member not found
 *       500:
 *         description: Server error
 */
import { NextResponse } from "next/server";
import { delete_member } from "@/controllers/members/delete_member";
import { withCors, corsHeaders } from "@/lib/cors";

export async function OPTIONS() {
    return new Response(null, {
        status: 200,
        headers: corsHeaders,
    });
}
export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;

        if (!id || isNaN(Number(id))) {
            return withCors(NextResponse.json(
                { msg: "Invalid ID" },
                { status: 400 }
            ));
        }

        const result = await delete_member(Number(id));

        return withCors(NextResponse.json(result));

    } catch (error) {
        return withCors(NextResponse.json(
            { msg: "Server error" },
            { status: 500 }
        ));
    }
}