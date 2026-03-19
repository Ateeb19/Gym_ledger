/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Logs out the authenticated user by clearing the authentication cookie.
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Logout successful
 */

import { NextResponse } from "next/server";
import { withCors, corsHeaders } from "@/lib/cors";

export async function OPTIONS() {
    return new Response(null, {
        status: 200,
        headers: corsHeaders,
    });
}
export async function POST() {


    const response = NextResponse.json({
        msg: "Logout success"
    })

    response.cookies.set("token", "", {
        expires: new Date(0)
    });

    // return response;
    return withCors(response);
}