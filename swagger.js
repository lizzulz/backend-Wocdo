const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation for my app',
    },
    components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ],
  servers: [
    {
      url: 'http://localhost:3001', 
    },
  ],
  },
  apis: ['./routes/*.js'], // files with Swagger annotations
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
