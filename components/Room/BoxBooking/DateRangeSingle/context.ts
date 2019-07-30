import { PriceByDayRes } from '@/types/Requests/Rooms/PriceByDay';

interface DataChangePriceByDay {
  [key: string]: PriceByDayRes;
}

export const changeDataPriceByDay = (data: PriceByDayRes[]): DataChangePriceByDay => {
  return data.reduce((a, b) => {
    if (!a[b.date]) {
      a[b.date] = b;
    }

    return a;
  }, {});
};
