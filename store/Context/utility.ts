import moment from 'moment';
import { extendMoment } from 'moment-range';

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
