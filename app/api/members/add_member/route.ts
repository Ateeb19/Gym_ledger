/**
 * @swagger
 * /api/members/add_member:
 *   post:
 *     summary: Add new gym member
 *     description: Create a new gym member under the logged-in admin
 *     tags:
 *       - Members
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
 *               - emergency_contact
 *               - height
 *               - weight
 *               - fitness_goal
 *               - personal_training
 *               - assign_trainer
 *               - medical_condition
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               contact:
 *                 type: string
 *               emergency_contact:
 *                 type: string
 *               height:
 *                 type: number
 *               weight:
 *                 type: number
 *               fitness_goal:
 *                 type: string
 *               personal_training:
 *                 type: boolean
 *               assign_trainer:
 *                 type: string
 *               medical_condition:
 *                 type: string
 *     responses:
 *       200:
 *         description: Member created successfully
 *       400:
 *         description: Validation error or member already exists
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
import { NextResponse } from "next/server";
import { add_member } from "@/controllers/members/add_member";
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

        const { name, email, contact, emergency_contact, height, weight, fitness_goal, personal_training, assign_trainer, medical_condition } = body;

        if (!name || !email || !contact || !emergency_contact || !height || !weight || !fitness_goal || !medical_condition) {
            // if (personal_training || !assign_trainer) {
            //     return NextResponse.json(
            //         { msg: "All fildes are required" },
            //         { status: 400 }
            //     );
            // }
            // return NextResponse.json(
            //     { msg: "All fildes are required" },
            //     { status: 400 }
            // );
            if (height === 0 || weight === 0) {
                return withCors(NextResponse.json(
                    { success: false, msg: "Height and weight can not be 0" },
                    { status: 400 }
                ));
            }
            if (isNaN(height) || isNaN(weight)) {
                return withCors(NextResponse.json(
                    { success: false, msg: "Height and weight must be numbers" },
                    { status: 400 }
                ));
            }
            return withCors(NextResponse.json(
                { success: false, msg: "All fields are required" },
                { status: 400 }
            ));
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return withCors(NextResponse.json(
                { success: false, msg: "Invalid email format" },
                { status: 400 }
            ));
        }

        const phoneRegex = /^[0-9]+$/;

        if (!phoneRegex.test(contact)) {
            return withCors(NextResponse.json(
                { success: false, msg: "Enter valid contact number" },
                { status: 400 }
            ));
        }

        if (!phoneRegex.test(emergency_contact)) {
            return withCors(NextResponse.json(
                { success: false, msg: "Enter valid emergency contact number" },
                { status: 400 }
            ));
        }

        const parsedHeight = parseFloat(height);
        const parsedWeight = parseFloat(weight);

        if (typeof personal_training !== "boolean") {
            return withCors(NextResponse.json(
                { success: false, msg: "Personal training must be true or false" },
                { status: 400 }
            ));
        }

        if (personal_training && !assign_trainer) {
            return withCors(NextResponse.json(
                { success: false, msg: "Trainer is required for personal training" },
                { status: 400 }
            ));
        }


        const join_date = new Date();

        const result = await add_member(name, email, contact, emergency_contact, parsedHeight, parsedWeight, fitness_goal, personal_training, assign_trainer, medical_condition, join_date);

        if (!result.success) {
            return withCors(NextResponse.json(
                { msg: result.msg, },
                { status: 400 },
            ))
        }

        const response = NextResponse.json(
            {
                success: result.success,
                msg: result.msg
            },
            { status: 200 }
        )

        return withCors(response);

    } catch (error) {
        return withCors(NextResponse.json(
            { msg: "Server error" },
            { status: 500 }
        ))
    }
}