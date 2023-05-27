import { Router } from 'express';

import { Sender } from '@modules/Sender';

const sender = new Sender();

const routerIndex = Router();
const routerTeste = Router();

routerTeste.get('/status', (req, res) => {
  const qr = sender.qrCode;
  const connected = sender.isConnected;

  return res.json({
    qr,
    connected,
  });
});

routerTeste.post('/send', async (req, res) => {
  const { number, message } = req.body;

  try {
    await sender.sendText(number, message);

    return res.send('Hello World!');
  } catch (error) {
    return res.status(400).json(error);
  }
});

routerIndex.use(routerTeste);

export { routerIndex };
