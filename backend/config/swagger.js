import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EASY ride API',
      version: '1.0.0',
      description: 'API documentation for the EASY ride backend',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://easyride-kt71.onrender.com/',
        description: 'Production server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Path to the API routes files
};

export const swaggerSpec = swaggerJsdoc(options);

