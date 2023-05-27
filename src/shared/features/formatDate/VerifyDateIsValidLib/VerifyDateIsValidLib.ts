import Moment from 'moment';

// expected: => 2023-03-10 => true | 2023w-03-10 => false | 2023-10 => false
export const handleVerifyDateIsValidLib = (hours: string) => {
  const isValid = Moment(hours, 'YYYY-MM-DD', true).isValid();
  return isValid;
};
