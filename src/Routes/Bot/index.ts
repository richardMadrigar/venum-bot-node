import { Router } from 'express';

import { Sender } from '@config/Sender';

const sender = new Sender('ws-sender-dev');

const routerBotWhats = Router();

routerBotWhats.get('/status', (req, res) => {
  const qr = sender.qrCode;
  const connected = sender.isConnected;

  return res.json({
    qr,
    connected,
  });
});

routerBotWhats.post('/send', async (req, res) => {
  const { number, message } = req.body;

  try {
    await sender.sendText(number, message);

    return res.send('Hello World!');
  } catch (error) {
    return res.status(400).json(error);
  }
});

export { routerBotWhats };
