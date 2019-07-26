/* eslint react/no-multi-comp:0, no-console:0 */

import React, { FC, useState, useRef, useMemo } from 'react';
import DatePicker from 'rc-calendar/lib/Picker';
import Calendar from 'rc-calendar';
import Cookies from 'universal-cookie';
import enGB from 'rc-calendar/lib/locale/en_GB';
import viVN from 'rc-calendar/lib/locale/vi_VN';
import moment, { Moment } from 'moment';
import 'moment/locale/vi';
import 'moment/locale/en-gb';
import { Grid, Paper, InputBase } from '@material-ui/core';
import { CalendarToday } from '@material-ui/icons';

const cookies = new Cookies();
const format = 'YYYY-MM-DD';
type Language = 'vi' | 'en';
const vi: Language = cookies.get('initLanguage') || 'vi';
const now = moment();

if (vi === 'vi') {
  now.locale('vi').utcOffset(7);
} else {
  now.locale('en-gb').utcOffset(0);
}
const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');
type Field = 'startValue' | 'endValue';

const DateRangeSearch: FC = () => {
  const [startValue, setStartValue] = useState(null);
  const [endValue, setEndValue] = useState(null);
  const refEndDate = useRef(null);

  const numberDay: number = useMemo(() => {
    if (startValue && endValue) {
      const startDate = moment(startValue);
      const endDate = moment(endValue);

      return Math.abs(startDate.diff(endDate, 'days'));
    }

    return 0;
  }, [endValue, startValue]);

  const onChange = (field: Field, value: Moment) => {
    if (field === 'startValue') {
      setStartValue(value);
      refEndDate.current.click();
    } else {
      setEndValue(value);
    }
  };

  const disabledEndDate = (endValue: Moment) => {
    if (!endValue) {
      return endValue.diff(moment(), 'days') <= -1;
    }
    if (!startValue) {
      return endValue.diff(moment(), 'days') <= -1;
    }
    return endValue.diff(startValue, 'days') <= 0;
  };

  const disabledStartDate = (startValue: Moment) => {
    // if (!startValue) {
    //   return startValue.diff(moment(), 'days') <= -1;
    // }
    // if (!endValue) {
    //   return startValue.diff(moment(), 'days') <= -1;
    // }
    // return endValue.diff(startValue, 'days') <= 0;
    return startValue.diff(moment(), 'days') <= -1;
  };

  const calendarStart = (
    <Calendar
      locale={vi === 'en' ? enGB : viVN}
      showDateInput={false}
      defaultValue={now}
      disabledDate={disabledStartDate}
      showToday={false}
    />
  );

  const calendarEnd = (
    <Calendar
      locale={vi === 'en' ? enGB : viVN}
      showDateInput={false}
      defaultValue={now}
      disabledDate={disabledEndDate}
    />
  );

  return (
    <Paper elevation={0} className="dateRangeSearch">
      <Grid container>
        <Grid item xs={5} className="calendar">
          <DatePicker
            animation="slide-up"
            calendar={calendarStart}
            value={startValue}
            onChange={(value) => onChange('startValue', value)}>
            {({ value }) => {
              return (
                <Grid container>
                  <Grid item xs={3} className="icon">
                    <CalendarToday fontSize="small"></CalendarToday>
                  </Grid>

                  <Grid item xs={9}>
                    <InputBase
                      placeholder="Ngày đến"
                      fullWidth
                      className="input"
                      inputProps={{ style: { padding: 0 } }}
                      readOnly
                      value={(value && `${value.format(format)}`) || ''}
                    />
                    {value && <p className="day">{value.format('dddd')}</p>}
                  </Grid>
                </Grid>
              );
            }}
          </DatePicker>
        </Grid>

        <Grid item xs={2} className="numberDay">
          <p>{numberDay}-N</p>
        </Grid>

        <Grid item xs={5} className="calendar">
          <DatePicker
            animation="slide-up"
            calendar={calendarEnd}
            value={endValue}
            onChange={(value) => onChange('endValue', value)}>
            {({ value }) => {
              return (
                <Grid container>
                  <Grid item xs={3} className="icon">
                    <CalendarToday fontSize="small"></CalendarToday>
                  </Grid>

                  <Grid item xs={9}>
                    <InputBase
                      ref={refEndDate}
                      placeholder="Ngày đến"
                      fullWidth
                      className="input"
                      inputProps={{ style: { padding: 0 } }}
                      readOnly
                      value={(value && `${value.format(format)}`) || ''}
                    />
                    {value && <p className="day">{value.format('dddd')}</p>}
                  </Grid>
                </Grid>
              );
            }}
          </DatePicker>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DateRangeSearch;
