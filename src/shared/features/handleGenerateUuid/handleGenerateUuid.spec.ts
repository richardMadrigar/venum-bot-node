import { describe, it, expect } from 'vitest';
import { z } from 'zod';

import { handleGenerateUuid } from './handleGenerateUuid';

describe('Test AppError', () => {
  it('Should return uuid', async () => {
    const resultUuid = handleGenerateUuid();

    expect(resultUuid).toBeTruthy();
  });

  it('Should return error if uuid formart invalid', () => {
    const uuid = z.string().uuid();

    const resultUuid = handleGenerateUuid();
    expect(() => uuid.parse(resultUuid)).not.toThrow();
  });
});
