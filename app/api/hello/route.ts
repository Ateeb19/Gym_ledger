import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Returns hello message
 *     description: Simple API that returns hello message
 *     responses:
 *       200:
 *         description: Successful response
 */
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

  // return NextResponse.json({
  //   message: "Hello from Gym Ledger API"
  // });
  return withCors(NextResponse.json({
    message: "Hello from Gym Ledger API"
  }),origin);
}