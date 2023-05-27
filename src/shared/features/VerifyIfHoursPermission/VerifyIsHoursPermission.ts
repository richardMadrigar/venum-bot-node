import { AppError } from '../../Util/AppError/AppError';

interface IHandleVerifyIsHours {
  start_time: string;
  end_time: string;
  hoursAtual: string;
}

export const handleVerifyIsHoursPermission = ({
  end_time, start_time, hoursAtual,
}: IHandleVerifyIsHours) => {
  const ishoursPermission = hoursAtual >= start_time && hoursAtual <= end_time;
  const verifyHours = start_time === '00:00' && end_time === '00:00';

  if (!ishoursPermission && !verifyHours) {
    throw new AppError(`Horário permitido ${start_time} até ${end_time} !`, 401);
  }
};
