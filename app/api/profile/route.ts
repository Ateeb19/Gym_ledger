/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Get user profile
 *     description: Returns logged-in user profile using authentication token stored in cookies
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Profile data returned successfully
 *       401:
 *         description: Unauthorized user
 */

import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { withCors, corsHeaders } from "@/lib/cors";

export async function OPTIONS(req: Request) {
    const origin = req.headers.get("origin");

    return new Response(null, {
        status: 200,
        headers: corsHeaders(origin),
    });
}
export async function GET(req: Request) {
    const origin = req.headers.get("origin");

    const user = await verifyToken();

    if (!user) {
        return withCors(NextResponse.json(
            {
                success: false,
                msg: "Unauthorized"
            },
            { status: 401 }
        ), origin);
    }

    return withCors(NextResponse.json({
        msg: "Profile data",
        user
    }), origin);
}