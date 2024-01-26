import config from '../config'

export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentación MS Logistic Hub Order Delivery ',
      version: '1.0',
      description: 'Logistic Hub Order Delivery',
    },
    servers: [
      {
        url: `http://localhost:${config.SERVER_PORT}/api`,
      },
    ],
  },
  apis: ['./src/router/*.ts'],
}
