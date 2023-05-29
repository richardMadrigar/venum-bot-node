import { RepositoryClientsPrisma } from '../../../repositories/Prisma/ClientsRepository';
import { CreateClientsController } from './CreateClients.controller';
import { CreateClientsUseCase } from './CreateClients.useCase';

const repositoryGruposImposto = new RepositoryClientsPrisma();
const createUseCase = new CreateClientsUseCase(repositoryGruposImposto);
const CreateClientsControllerIndex = new CreateClientsController(createUseCase);

export { CreateClientsControllerIndex };
