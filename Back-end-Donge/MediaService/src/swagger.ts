import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";

dotenv.config();

const doc = {
    info: {
        title: "Media-API",
        description: "test the routes",
    },
    host: (process.env.BASE_URL as string).split('//')[1],
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            scheme: 'bearer',
            in: 'header',
            name: 'Authorization',
            bearerFormat: 'JWT',
        },
    },
    security: [{
        bearerAuth: []
    }],
    components: {
        schemas: {
            MediaUploud: {
                type: 'object',
                propeties: {
                    type: {
                        type: 'string',
                        enum: ['USER_PROFILE', 'GROUP_PROFILE']
                    },
                    groupId: {
                        type: 'number',
                        description: 'Required for GROUP_PROFILE type'
                    },
                    image: {
                        type: 'file',
                        format: 'binary'
                    }
                }
            }
        }
    }
};

const outputFile = './swagger-output.json';
const routes = ['./server.ts'];

swaggerAutogen(outputFile, routes, doc);