import { Router } from 'express';

import { CreateClientsControllerIndex } from 'UseCases/Clients/Create';

export const routerClients = Router();

routerClients.post(
  '/create',
  (req, res) => CreateClientsControllerIndex.handle(req, res),
);

routerClients.post('/sessions');
