import React, { useState } from 'react';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import moment, { Moment } from 'moment';
import 'react-dates/lib/css/_datepicker.css';

moment().toJSON();

const birthdays = {
  '2019-07-20': '2TR',
  '2019-07-21': '2TR',
  '2019-07-22': '2TR',
  '2019-07-23': '2TR',
  '2019-07-24': '2TR',
  '2019-07-25': '2TR',
  '2019-07-26': '2TR'
};

const ReactDates = () => {
  const [focused, setFocused] = useState(false);

  const _renderDayContents = (day: Moment) => {
    const date = day.format('YYYY-MM-DD');

    console.log(date);

    return (
      <div>
        <p>{day.date()}</p>
        <p>{birthdays[date]}</p>
      </div>
    );
  };

  return (
    <SingleDatePicker
      date={moment()}
      numberOfMonths={1}
      onDateChange={(date) => {
        console.log(date);
      }} // PropTypes.func.isRequired
      focused={focused} // PropTypes.bool
      onFocusChange={({ focused }) => setFocused(focused)} // PropTypes.func.isRequired
      id="your_unique_id"
      renderDayContents={_renderDayContents}></SingleDatePicker>
  );
};

export default ReactDates;
