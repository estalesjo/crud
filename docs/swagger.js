const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Node Swagger API",
    version: "1.0.0",
    description: "Describe a crud API with Swagger"
  },
  host: "localhost:3000",
  basePath: "/crud"
};

// options for the swagger docs
const options = {
  swaggerDefinition,
  // path to the API docs
  apis: ["**/*.yaml"]
};

module.exports = swaggerJSDoc(options);
