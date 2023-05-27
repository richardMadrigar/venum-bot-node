import { describe, it, expect } from 'vitest';

import { handleVerifyIsHoursPermission } from './VerifyIsHoursPermission';

describe('VerifyIsHoursPermission', () => {
  it('Should return undefined if Hours Permissions', async () => {
    const resultDateUS = handleVerifyIsHoursPermission({
      hoursAtual: '12:00',
      end_time: '14:00',
      start_time: '10:00',
    });
    expect(resultDateUS).toEqual(undefined);
  });

  it('Should return erro if Hours not Permissions', async () => {
    const end_time = '14:00';
    const hoursAtual = '17:00';
    const start_time = '10:00';

    expect(async () => {
      handleVerifyIsHoursPermission({ end_time, start_time, hoursAtual });
    }).rejects.toEqual({ message: `Horário permitido ${start_time} até ${end_time} !`, statusCode: 401 });
  });
});
