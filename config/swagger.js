import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Uber-like Clone API',
      version: '1.0.0',
      description: 'API documentation for the Uber-like clone backend',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Path to the API routes files
};

export const swaggerSpec = swaggerJsdoc(options);

