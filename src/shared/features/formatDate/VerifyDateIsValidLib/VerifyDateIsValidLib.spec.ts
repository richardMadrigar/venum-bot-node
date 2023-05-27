import { describe, it, expect } from 'vitest';

import { handleVerifyDateIsValidLib } from './VerifyDateIsValidLib';

describe('Verify is Date is valid', () => {
  it('Should verify is Date is valid', async () => {
    const dateBR = '2023-03-01';

    const resultDateUS = handleVerifyDateIsValidLib(dateBR);

    expect(resultDateUS).toBe(true);
  });
  it('Should return error is Date with format invalid', async () => {
    expect(handleVerifyDateIsValidLib('2023-0w3-01')).toBe(false);
    expect(handleVerifyDateIsValidLib('20s23-03-01')).toBe(false);

    expect(handleVerifyDateIsValidLib('s0:90')).toBe(false);
    expect(handleVerifyDateIsValidLib('0:2023-03-01')).toBe(false);

    expect(handleVerifyDateIsValidLib('25:2023-03-01')).toBe(false);
    expect(handleVerifyDateIsValidLib('10:2023-03-01')).toBe(false);
  });
});
