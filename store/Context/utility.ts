import moment from 'moment';
import { extendMoment } from 'moment-range';
import Router from 'next/router';
import _ from 'lodash';
// @ts-ignore
export const momentRange = extendMoment(moment);

export interface ResponseObject<T> {
  code: number;
  status: string;
  data: T;
}

export const updateObject = <T>(oldObject: T, newObject: Partial<T>): T => {
  return {
    ...oldObject,
    ...newObject
  };
};

export const updateRouter = (
  notArray: boolean,
  param: string,
  value: any,
  param2?: string,
  value2?: any,
  param3?: string,
  value3?: any
) => {
  console.log(param, value);
  const obj = {};
  if (notArray) {
    // console.log('param', param);
    // console.log('value', value);
    if (param2) obj[param2] = value2;
    if (param3) obj[param3] = value3;
    obj[param] = value;
  } else {
    obj[param] = _.join(value, ',');
    if (param2) obj[param2] = value2;
  }

  const query = updateObject(Router.query, obj);

  Router.push({
    pathname: '/rooms',
    query
  });
};
