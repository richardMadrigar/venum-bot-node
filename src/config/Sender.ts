import parsePhoneNumber, { isValidPhoneNumber } from 'libphonenumber-js';
import { SocketState, Whatsapp, create } from 'venom-bot';

import { AppError } from '@shared/Util/AppError/AppError';

export type QRCode = {
  base64Qr: string;
  attempts?: number;
};

export class Sender {
  private client!: Whatsapp;
  private connected!: boolean;
  private qr!: QRCode;

  get isConnected(): boolean {
    return this.connected;
  }
  get qrCode(): QRCode {
    return this.qr;
  }

  constructor(value: string) {
    this.initialize(value);
  }

  async sendText(to: string, body: string) {
    if (!this.isConnected) throw new AppError('Não tem um número conectado !');

    if (!isValidPhoneNumber(to, 'BR')) throw new AppError('Numero com formato invalido');

    const phoneNumberFormat = parsePhoneNumber(to, 'BR')?.format('E.164').replace('+', '');

    const phoneNumber = phoneNumberFormat?.includes('@c.us') ? phoneNumberFormat : `${phoneNumberFormat}@c.us`;

    this.client.sendText(phoneNumber, body);
  }

  private initialize(value: string) {
    const qr = (base64Qr: string, asciiQR: string, attempts?: number) => {
      this.qr = { base64Qr, attempts };
    };

    const status = (statusSession: string) => {
      this.connected = ['isLogged ', 'qrReadSuccess ', 'chatsAvailable'].includes(statusSession);
    };

    const start = (client: Whatsapp) => {
      this.client = client;

      client.onStateChange((state) => {
        this.connected = state === SocketState.CONNECTED;
      });
    };

    create(value, qr, status)
      .then((client) => start(client))
      .catch((err) => {
        throw new AppError(err);
      });
  }
}
