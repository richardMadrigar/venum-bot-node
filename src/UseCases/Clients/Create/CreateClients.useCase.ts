import { IClientsRepository } from 'repositories/IUsersRepository';

import { AppError } from '@shared/Util/AppError/AppError';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { ICreateClientsUseCaseDTO } from './DTO/ICreateClientsDTO';
import { SchemaCreateClients } from './SchemaCreateClients';

export class CreateClientsUseCase {
  constructor(private repositoryClients: IClientsRepository) {}

  async execute(request: ICreateClientsUseCaseDTO.Params):
      Promise<ICreateClientsUseCaseDTO.Result> {
    const {
      client, isActive, limitSend, obs, sessionClient, telephone,
    } = ZODVerifyParse({
      data: request, schema: SchemaCreateClients,
    }) as ICreateClientsUseCaseDTO.Params;

    const {
      isExists: isExistSessionClient,
    } = await this.repositoryClients.FindExistsBySessionClient({ sessionClient });
    if (isExistSessionClient) throw new AppError('Escolher outro nome para a sessão do whats !');

    const {
      isExists: isExistTelephone,
    } = await this.repositoryClients.FindExistsByTelephone({ telephone });
    if (isExistTelephone) throw new AppError('Escolher outro numero de telefone, este telefone já esta conectado !');

    const resultCreate = await this.repositoryClients.Create({
      client, isActive, limitSend, obs, sessionClient, telephone,
    });

    const returnResponse = {
      id: resultCreate.id,
      message: 'Cliente criado com sucesso !',
    };

    return returnResponse;
  }
}
