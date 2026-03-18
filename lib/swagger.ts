// import swaggerJsdoc from "swagger-jsdoc";
// import path from "path";

// export function getSwaggerSpec() {
//   const options = {
//     definition: {
//       openapi: "3.0.0",
//       info: {
//         title: "Gym Ledger API",
//         version: "1.0.0",
//         description: "API documentation",
//       },
//     },
//     apis: [path.join(process.cwd(), "app/api/**/*.ts")],
//   };

//   return swaggerJsdoc(options);
// }

// scripts/swagger.ts
import swaggerJsdoc from "swagger-jsdoc";
import fs from "fs";

const spec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Gym Ledger API",
      version: "1.0.0",
    },
  },
  apis: ["./app/api/**/*.ts"], // works here (Node env)
});

fs.writeFileSync("swagger.json", JSON.stringify(spec, null, 2));