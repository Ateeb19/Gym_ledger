/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register new user
 *     description: Create a new user account
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - confirmPass
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ateeb
 *               email:
 *                 type: string
 *                 example: ateeb@gmail.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *               confirmPass:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: User registered successfully
 *       400:
 *         description: Validation error or user already exists
 *       500:
 *         description: Server error
 */

import { NextResponse } from "next/server";
import { signup } from "@/controllers/auth/signupController";
import { withCors, corsHeaders } from "@/lib/cors";

export async function OPTIONS() {
    return new Response(null, {
        status: 200,
        headers: corsHeaders,
    });
}
export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { name, email, password, confirmPass } = body;

        if (!name || !email || !password || !confirmPass) {
            return withCors(NextResponse.json(
                { meg: "All fildes are required" },
                { status: 400 }
            ));
        }

        if (password != confirmPass) {
            return withCors(NextResponse.json(
                { msg: "Password and confirm not match" },
                { status: 400 }
            ))
        }

        if (password.length < 8) {
            return withCors(NextResponse.json(
                { msg: "Password must be 8 characters long" },
                { status: 400 }
            ))
        }

        const result = await signup(name, email, password);

        if (!result.success) {
            return withCors(NextResponse.json(
                { msg: result.msg },
                { status: 400 }
            ));
        }

        const response = NextResponse.json(
            {
                success: result.success,
                msg: result.msg
            }
        );

        return withCors(response);

    }
    catch (error) {
        return withCors(
            NextResponse.json(
                { msg: "Server error" },
                { status: 500 }
            ))
    }
}