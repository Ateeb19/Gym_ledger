/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticate user and return JWT token stored in cookie
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: ateeb@gmail.com
 *               password:
 *                 type: string
 *                 example: 1234567890
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Ateeb
 *                     email:
 *                       type: string
 *                       example: ateeb@gmail.com
 *                     role:
 *                       type: integer
 *                       example: 0
 *       400:
 *         description: Invalid credentials or missing fields
 *       500:
 *         description: Server error
 */

import { NextResponse } from "next/server";
import { login } from "@/controllers/auth/loginController";
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

        const { email, password } = body;

        if (!email || !password) {
            return withCors(NextResponse.json(
                { msg: "All fildes are required" },
                { status: 400 }
            ),origin);
        }

        // const result = await login(email, password);

        // if (!result.success) {
        //     return withCors(NextResponse.json(
        //         { msg: result.msg, },
        //         { status: 400 },
        //     ))
        // }

        // const response = NextResponse.json(
        //     {
        //         msg: result.msg,
        //         token: result.token,
        //         user: result.user
        //     },
        //     { status: 200 }
        // );

        // response.cookies.set("token", result.token, {
        //     httpOnly: true,
        //     secure: false,
        //     maxAge: 60 * 60 * 24,
        //     path: "/"
        // });

        // // return response;
        // return withCors(response);
        const result = await login(email, password);

        if (!result.success || !result.token) {
            return withCors(
                NextResponse.json(
                    { msg: result.msg || "Token generation failed" },
                    { status: 400 }
                ),origin
            );
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

        return withCors(response,origin);

    } catch (error) {
        // return NextResponse.json(
        //     { msg: "Server error" },
        //     { status: 500 }
        // )
        console.log('login error -: ',error);
        return withCors(
            NextResponse.json(
                { msg: "Server error" },
                { status: 500 }
            ),origin
        );
    }
}