import moment, { Moment } from 'moment';
import { ChangeEvent, useMemo } from 'react';
import _ from 'lodash';
import { IncomingMessage } from 'http';

export const formatMoney = (
  amount: any,
  decimalCount: number = 0,
  decimal: string = '.',
  thousands: string = ','
): string | void => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? '-' : '';

    let i: any = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j: number = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : '')
    );
  } catch (e) {
    console.error(e);
  }
};

export const formatTime = (
  date: string,
  hours: number = 0,
  minutes: number = 0,
  seconds: number = 0
): string => {
  let momentObject: Moment = moment(date, 'YYYY-MM-DD')
    .hours(hours)
    .minutes(minutes)
    .seconds(seconds);

  if (!momentObject.isValid()) throw 'Date format invalid';

  return momentObject.format('YYYY-MM-DD HH:mm:ss');
};

export const arrayFilterCheckBoxEvent = <E extends HTMLInputElement>(
  current: number[],
  event: ChangeEvent<E>,
  status: boolean
) => {
  let list = [...current];
  let value = parseInt(event.target.value);
  status ? list.push(value) : _.remove(list, (n) => n === value);

  return list;
};

export const selfMemo = <T = any>(value: T): T => {
  return useMemo(() => value, [value]);
};

export const formatPrice = (price: number): string => {
  try {
    let format = '';
    if (price >= 1000000) {
      format = (price / 1000000).toFixed(2) + 'tr ';
    } else {
      format = (price / 1000).toFixed(0) + 'k ';
    }
    return format;
  } catch (e) {
    console.error(e);
  }
};

export const getCookieFromReq = (req: IncomingMessage, cookie: string) => {
  if (!req) {
    return undefined;
  }

  const cookies = req.headers.cookie.split(';').find((c) => c.trim().startsWith(`${cookie}=`));

  if (!cookies) {
    return undefined;
  }

  return cookies.split('=')[1];
};

export const getFirstLetterOfName = (name: string) => {
  let splitName =  name.split(' ');
  let itemLast = splitName.slice(-1).pop();
  return itemLast!.substring(0,1);
}
