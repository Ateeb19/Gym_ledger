const swaggerJsdoc = require("swagger-jsdoc");
const fs = require("fs");

const spec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Gym Ledger API",
      version: "1.0.0",
    },
  },
  apis: ["./app/api/**/route.ts"]
});

fs.writeFileSync("swagger.json", JSON.stringify(spec, null, 2));

console.log("Swagger JSON generated");