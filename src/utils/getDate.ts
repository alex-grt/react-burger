import moment from 'moment';
import 'moment/locale/ru';

export function getDate(date: string): string {
  const orderDate = moment(date).locale('ru');

  return `${orderDate.fromNow()}, ${orderDate.format('hh:mm')} i-GMT+3`;
};
