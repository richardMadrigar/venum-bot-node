import { describe, it, expect } from 'vitest';

import { handleVerifyHoursIsValidLib } from './VerifyHoursIsValidLib';

describe('Verify is Hours is valid', () => {
  it('Should verify is Hours is valid', async () => {
    const dateBR = '10:20';

    const resultDateUS = handleVerifyHoursIsValidLib(dateBR);

    expect(resultDateUS).toBe(true);
  });
  it('Should return error is Hours with format invalid', async () => {
    expect(handleVerifyHoursIsValidLib('10')).toBe(false);
    expect(handleVerifyHoursIsValidLib('1020')).toBe(false);

    expect(handleVerifyHoursIsValidLib('s0:90')).toBe(false);
    expect(handleVerifyHoursIsValidLib('0:s90')).toBe(false);

    expect(handleVerifyHoursIsValidLib('25:20')).toBe(false);
    expect(handleVerifyHoursIsValidLib('10:90')).toBe(false);
  });
});
