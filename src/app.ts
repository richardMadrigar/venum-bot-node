import express, { NextFunction, Request, Response } from 'express';

import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import { routerIndex } from 'Routes';
import swaggerUi from 'swagger-ui-express';

import { AppError } from '@shared/Util/AppError/AppError';
import { logger } from '@shared/Util/configLogger';
import { env } from '@shared/Util/variaveisAmbiente/env';

import { routerBotWhats } from './Routes/Bot';
import swaggerDocument from './shared/Swagger/swagger.json';

export const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

app.use(routerBotWhats);

app.use(routerIndex);

if (env.NODE_ENV === 'PRODUCTION') {
  process.on('uncaughtException', (error) => logger.error(error));
}

app.use(
  async (err: Error, request: Request, response: Response, next: NextFunction) => {
    logger.debug(err);

    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    response.status(500).json({ message: 'Erro desconhecido!' });
    return next();
  },
);
