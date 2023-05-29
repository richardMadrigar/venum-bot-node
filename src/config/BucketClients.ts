import { Whatsapp } from 'venom-bot';

export interface IBucketSender {
  number: string;
  client: Whatsapp;
}

const arrClients: IBucketSender[] = [];

export const handleBucketClientesSender = async (clients: IBucketSender[]) => {
  clients.forEach((item) => {
    if (!arrClients.some((clients) => clients.client.session === item.client.session)) {
      arrClients.push({
        client: item.client,
        number: item.number,
      });
    }
  });
};

export const handleReturnBucketClients = async () => arrClients;
