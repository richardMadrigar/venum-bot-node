import { describe, it, expect } from 'vitest';

import { FormatDateUS } from './FormatDateUs';

describe('FormatDateUS', () => {
  it('Should format BR data to US', async () => {
    const dateBR = '03/08/2022';
    const resultDateUS = FormatDateUS(dateBR);

    expect(resultDateUS).toBe('2022-08-03');
  });
});
