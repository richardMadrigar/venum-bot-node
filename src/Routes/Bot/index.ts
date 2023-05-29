import { Router } from 'express';

// import { Sender } from '@config/Sender';

import { handleBucketClientesSender, handleReturnBucketClients } from '@config/BucketClients';

import { AppError } from '@shared/Util/AppError/AppError';

import { handle } from '../../teste';

// const sender = new Sender('ws-sender-dev');

const routerBotWhats = Router();

// routerBotWhats.get('/status', (req, res) => {
//   const qr = sender.qrCode;
//   const connected = sender.isConnected;

//   return res.json({
//     qr,
//     connected,
//   });
// });

// routerBotWhats.post('/send', async (req, res) => {
//   const { number, message } = req.body;

//   try {
//     await sender.sendText(number, message);

//     return res.send('Hello World!');
//   } catch (error) {
//     return res.status(400).json(error);
//   }
// });

// sender.execute().then();
routerBotWhats.post('/teste1', async (req, res) => {
  try {
    await handle();

    return res.send('Hello World!');
  } catch (error) {
    return res.status(400).json(error);
  }
});

routerBotWhats.post('/teste', async (req, res) => {
  // const { number, message } = req.body;
  try {
    const resultClients = await handleReturnBucketClients();
    if (resultClients.some((item) => item.client.session === 'ws-sender-dev-2')) {
      await resultClients[0].client.sendText('5511985737008@c.us', 'aaa');
    } else {
      throw new AppError('Cliente não conectado ');
    }

    return res.send('Hello World!');
  } catch (error) {
    return res.status(400).json(error);
  }
});

export { routerBotWhats };
