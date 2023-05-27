import { describe, it, expect } from 'vitest';

import { AppError } from './AppError';

describe('Test AppError', () => {
  it('Should return an error message and status Error default 400', async () => {
    await expect(async () => {
      throw new AppError('test AppError');
    }).rejects.toEqual({ message: 'test AppError', statusCode: 400 });
  });
  it('Should return an error message and status Error send', async () => {
    await expect(async () => {
      throw new AppError('test AppError', 422);
    }).rejects.toEqual({ message: 'test AppError', statusCode: 422 });
  });
});
