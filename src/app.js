import express from 'express';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import {options} from './swaggerOptions';
const specs = swaggerJSDoc(options)

import aulasRoutes from './routes/aulas';

const notFound = require('./middlewares/notFound.js')
const handleError = require('./middlewares/handleError')

const app = express();

app.use(aulasRoutes)

// Documentación
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));

// Errores
app.use(notFound);

app.use(handleError);

export default app