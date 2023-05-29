import { IBucketSender, handleBucketClientesSender, handleReturnBucketClients } from '@config/BucketClients';
import { Pool, QueryResult } from 'pg';
import { create, Whatsapp } from 'venom-bot';

import { AppError } from '@shared/Util/AppError/AppError';
import { logger } from '@shared/Util/configLogger';

interface IClientConfig {
  clientId: string;
  numero: string;
  empresa: string;
}

const pgConfig = {
  user: 'postgres',
  password: 'teste123',
  host: 'localhost',
  port: 5432,
  database: 'ODONTO',
};

const loadClientConfig = async (): Promise<IClientConfig[]> => {
  const pool = new Pool(pgConfig);

  // const id = 2;
  // try {
  //   const query = `SELECT * FROM what where client_id = '${id}'`;

  try {
    const query = 'SELECT * FROM what';
    const result: QueryResult<IClientConfig> = await pool.query(query);

    return result.rows;
  } catch (error) {
    throw new AppError(`Erro ao carregar as informações do cliente: ${error}`);
  } finally {
    pool.end();
  }
};

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
// if no array que eu tenho já estiver o valor da empresa então n fazer nada
export const handle = async () => {
  const result = await loadClientConfig();
  const arr: IBucketSender[] = [];
  const resultBucketClients = await handleReturnBucketClients();

  // eslint-disable-next-line no-restricted-syntax
  for (const item of result) {
    if (!resultBucketClients.some((clients) => clients.client.session === item.empresa)) {
      // eslint-disable-next-line no-await-in-loop
      const resultClient = await createClients({
        numero: item.numero,
        empresa: item.empresa,
        clientId: '121',
      });
      arr.push(resultClient);
    }
  }
  await handleBucketClientesSender(arr);

  return arr;
};
