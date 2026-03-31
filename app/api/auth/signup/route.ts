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
 *               - contact
 *               - gym_name
 *               - password
 *               - confirmPass
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ateeb
 *               email:
 *                 type: string
 *                 example: ateeb@gmail.com
 *               contact:
 *                 type: string
 *                 example: 34334343434
 *               gym_name:
 *                 type: string
 *                 example: body_building
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

export async function OPTIONS(req: Request) {
    const origin = req.headers.get("origin");

    return new Response(null, {
        status: 200,
        headers: corsHeaders(origin),
    });
}

export async function POST(req: Request) {
    const origin = req.headers.get("origin");

    try {
        const body = await req.json();

        const { name, email, contact, gym_name, password, confirmPass } = body;

        if (!name || !email || !contact || !gym_name || !password || !confirmPass) {
            return withCors(NextResponse.json(
                { meg: "All fields are required" },
                { status: 400 }
            ), origin);
        }

        if (password !== confirmPass) {
            return withCors(NextResponse.json(
                { msg: "Password and confirm not match" },
                { status: 400 }
            ), origin)
        }

        if (password.length < 8) {
            return withCors(NextResponse.json(
                { msg: "Password must be 8 characters long" },
                { status: 400 }
            ), origin)
        }

        const result = await signup(name, email, contact, gym_name, password);

        // if (!result.success) {
        //     return withCors(NextResponse.json(
        //         { msg: result.msg },
        //         { status: 400 }
        //     ));
        // }
        if (!result.success || !result.token) {
            return withCors(NextResponse.json(
                { msg: result.msg || "Signup failed" },
                { status: 400 }
            ), origin);
        }
        const response = NextResponse.json(
            {
                msg: result.msg,
                token: result.token,
                user: result.user
            },
            { status: 200 }
        );
        response.cookies.set("token", result.token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 24,
            path: "/"
        });

        return withCors(response, origin);

    }
    catch (error) {
        console.log('signup error -',error);
        return withCors(
            NextResponse.json(
                { msg: "Server error" },
                { status: 500 }
            ), origin)
    }
}