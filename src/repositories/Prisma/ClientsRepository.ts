import { prismaService } from '@config/database/configDb';
import { Clients } from '@prisma/client';
import {
  IClientsRepository, ICreateClientRepoDTO, IFindExistsBySessionClientDTO,
} from 'repositories/IUsersRepository';

export class RepositoryClientsPrisma implements IClientsRepository {
  async FindExistsBySessionClient(data: IFindExistsBySessionClientDTO.Params) {
    const resultGet = await prismaService.clients.findUnique({
      where: { sessionClient: data.sessionClient },
      select: { sessionClient: true },
    });

    return {
      isExists: !!resultGet?.sessionClient,
    };
  }

  async Create(data: ICreateClientRepoDTO.Params) {
    const resultCreate = await prismaService.clients.create({
      data: { ...data },
    });

    return {
      id: resultCreate.id,
    };
  }

  async getManyClients(): Promise<Clients[]> {
    const result = await prismaService.clients.findMany();

    return result;
  }
}
