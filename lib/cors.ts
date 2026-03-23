// const allowedOrigins = [
//     "http://localhost:5173",
//     "http://localhost:5174"
// ];
// export const corsHeaders = (origin: string | null) => ({
//     "Access-Control-Allow-Origin": allowedOrigins.includes(origin || "")
//         ? origin
//         : "http://localhost:5173",
//     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//     "Access-Control-Allow-Headers": "Content-Type, Authorization",
//     "Access-Control-Allow-Credentials": "true",
// });

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174"
];

export const corsHeaders = (origin: string | null): Record<string, string> => {
    const safeOrigin =
        origin && allowedOrigins.includes(origin)
            ? origin
            : "http://localhost:5173";

    return {
        "Access-Control-Allow-Origin": safeOrigin,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
    };
};
export function withCors(response: Response, origin: string | null) {
    const headers = corsHeaders(origin);

    // Object.entries(corsHeaders).forEach(([key, value]) => {
    //     response.headers.set(key, value);
    // });

    Object.entries(headers).forEach(([key, value]) => {
        response.headers.set(key, value);
    });
    return response;
}