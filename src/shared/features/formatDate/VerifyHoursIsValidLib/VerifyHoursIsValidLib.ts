import Moment from 'moment';

// expected: => 10:04 => true | 12:s10 => false | 25:70 => false
export const handleVerifyHoursIsValidLib = (hours: string) => {
  const isValid = Moment(hours, 'HH:mm', true).isValid();
  return isValid;
};
