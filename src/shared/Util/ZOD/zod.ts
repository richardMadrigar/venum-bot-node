import { z } from 'zod';

import { AppError } from '../AppError/AppError';

interface IZODVerifyParse {
  schema: z.ZodObject<any> | z.ZodEffects<any>,
  data: unknown
}

export const ZODVerifyParse = ({ schema, data }: IZODVerifyParse) => {
  try {
    const resultParse = schema.parse(data);
    return resultParse;
  } catch (error: any) {
    const { message: messageError } = JSON.parse(error.message)[0];

    throw new AppError(messageError, 422);
  }
};
