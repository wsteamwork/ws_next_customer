export interface PriceByDayRes {
  date: string;
  price_day: number;
  price_hour: number;
  blocked: boolean;
}

export interface BodyRequestPriceByDayRes {
  date_start: string;
  date_end: string;
}
