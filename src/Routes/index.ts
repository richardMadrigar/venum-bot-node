import { Router } from 'express';

import { routerClients } from './Clients/RoutesClients';

export const routerIndex = Router();

routerIndex.use('/clients', routerClients);
