import { z } from 'zod';

export const SchemaCreateClients = z.object({
  client: z
    .string({
      required_error: 'Enviar campo de "client" !',
      invalid_type_error: 'Enviar campo "client" como string',
    })
    .transform((item) => item.trim())
    .superRefine((val, ctx) => {
      if (val.length < 1) {
        ctx.addIssue({
          code: 'custom',
          message: 'Nome do cliente é obrigatório !',
        });
      }
    }),

  sessionClient: z
    .string({
      required_error: 'Enviar campo de "sessionClient" !',
      invalid_type_error: 'Enviar campo "sessionClient" como string',
    })
    .transform((item) => item.trim()).transform((item) => item.replace(/\s+/g, '-'))
    .superRefine((val, ctx) => {
      if (val.length < 1) {
        ctx.addIssue({
          code: 'custom',
          message: 'Nome da sessão cliente é obrigatório !',
        });
      }
    }),

  telephone: z
    .string({
      required_error: 'Enviar campo de "telephone" !',
      invalid_type_error: 'Enviar campo "telephone" como string',
    })
    .transform((item) => item.trim())
    .superRefine((val, ctx) => {
      if (val.length < 1) {
        ctx.addIssue({ code: 'custom', message: 'Telefone é obrigatório !' });
      }
    }),

  limitSend: z.coerce
    .number({
      required_error: 'Enviar campo de "valor" !',
      invalid_type_error: 'Enviar campo "valor" como number',
    })
    .nonnegative({ message: 'Enviar valor positivo !' })
    .superRefine((val, ctx) => {
      if (String(val).trim().length > 9) {
        ctx.addIssue({
          code: 'custom',
          message:
            'Valor do imposto não pode ser maior que 9 dígitos no total !',
        });
      }
      if (String(val).trim().length < 1) {
        ctx.addIssue({
          code: 'custom',
          message: 'Limite de envio é obrigatório !',
        });
      }
    }),

  isActive: z.boolean({
    required_error: 'Enviar campo de "isActive" !',
    invalid_type_error: 'Enviar campo "isActive" como boolean',
  }),

  obs: z
    .string({
      required_error: 'Enviar campo de "obs" !',
      invalid_type_error: 'Enviar campo "obs" como string',
    })
    .transform((item) => item || 'null'),

  tenant: z.string({ required_error: 'tenant token não encontrado' }),
}).superRefine(
  ({ client, sessionClient }, ctx) => {
    if (sessionClient === client) {
      ctx.addIssue({ code: 'custom', message: 'Nome da sessão não pode ser igual ao do cliente' });
    }
  },
);
