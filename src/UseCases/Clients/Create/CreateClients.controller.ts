import { Request, Response } from 'express';

import { CreateClientsUseCase } from './CreateClients.useCase';

export class CreateClientsController {
  constructor(private createClientsUseCase: CreateClientsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const {
      obs,
      client,
      isActive,
      limitSend,
      telephone,
      tenant_token,
      sessionClient,
    } = request.body;

    const resultCreate = await this.createClientsUseCase.execute({
      obs,
      client,
      isActive,
      limitSend,
      telephone,
      sessionClient,
      tenant: tenant_token,
    });

    return response.status(201).json(resultCreate);
  }
}
