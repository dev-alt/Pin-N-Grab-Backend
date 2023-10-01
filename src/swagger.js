const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

/**
 * Swagger options object.
 * @typedef {Object} SwaggerOptions
 * @property {Object} swaggerDefinition - Swagger definition object.
 * @property {string} swaggerDefinition.openapi - OpenAPI version.
 * @property {Object} swaggerDefinition.info - Information about the API.
 * @property {string} swaggerDefinition.info.title - Title of the API.
 * @property {string} swaggerDefinition.info.version - Version of the API.
 * @property {string} swaggerDefinition.info.description - Description of the API.
 * @property {Object[]} swaggerDefinition.servers - List of servers for the API.
 * @property {string} swaggerDefinition.servers[].url - URL of the server.
 * @property {Object[]} swaggerDefinition.tags - List of tags for the API.
 * @property {string} swaggerDefinition.tags[].name - Name of the tag.
 * @property {string[]} apis - List of API routes.
 */
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'Documentation for your API',
    },
    servers: [
        {
          url: 'http://localhost:5050',
        },
      ],
      tags: [
        {
          name: 'Auth', 
        },
        {
          name: 'Jobs', 
        },
        {
          name: 'User', 
        },
        {
          name: 'Email', 
        },
      ],
    },
  apis: ['./src/routes/*.js'], 
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
