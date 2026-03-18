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
export async function GET() {
  return NextResponse.json({
    message: "Hello from Gym Ledger API"
  });
}