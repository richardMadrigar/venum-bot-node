import { z } from 'zod';

import { SchemaCreateClients } from '../SchemaCreateClients';

type ICreateClientsZOD = z.output<typeof SchemaCreateClients>;

export interface ICreateClientsRequest extends ICreateClientsZOD {}

export namespace ICreateClientsUseCaseDTO {
  export type Params = ICreateClientsRequest;

  export type Result = {
    id: string;
    message: string;
  };
}
