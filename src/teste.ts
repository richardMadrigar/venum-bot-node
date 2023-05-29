import { IBucketSender, handleBucketClientesSender, handleReturnBucketClients } from '@config/BucketClients';
import { RepositoryClientsPrisma } from 'repositories/Prisma/ClientsRepository';
import { create, Whatsapp } from 'venom-bot';

import { logger } from '@shared/Util/configLogger';

interface IClientConfig {
  clientId: string;
  numero: string;
  empresa: string;
}

// function onStateChange(state: string, number: string) {
//   logger.info(`Estado da conexão do bot alterado para o número ${number}:`, state);
//   // Lógica para lidar com alterações no estado da conexão
//   // ...
// }

const createClients = async (
  clientConfig: IClientConfig,
): Promise<{ number: string; client: Whatsapp }> => {
  const clients: { number: string; client: Whatsapp }[] = [];

  try {
    const client: Whatsapp = await create(clientConfig.empresa);
    logger.info(
      `Bot conectado com sucesso para o numero ${clientConfig.numero}`,
    );
    clients.push({ number: clientConfig.numero, client });

    // // Registrar eventos do bot para o número específico
    // client.onStateChange((state) => onStateChange(state, number));

    // Outras configurações e ações iniciais do bot para o número específico
  } catch (error) {
    logger.fatal(
      `Erro ao criar a conexão do bot para o número ${clientConfig.numero}:`,
      error,
    );
  }

  return clients[0];
};

export const handle = async () => {
  const repository = new RepositoryClientsPrisma();

  const result = await repository.getManyClients();

  const arr: IBucketSender[] = [];
  const resultBucketClients = await handleReturnBucketClients();

  // eslint-disable-next-line no-restricted-syntax
  for (const item of result) {
    if (!resultBucketClients.some((clients) => clients.client.session === item.sessionClient)) {
      // eslint-disable-next-line no-await-in-loop
      const resultClient = await createClients({
        numero: item.telephone,
        empresa: item.sessionClient,
        clientId: '121',
      });
      arr.push(resultClient);
    }
  }
  await handleBucketClientesSender(arr);

  return arr;
};
