import React, { useContext, useMemo, memo } from 'react';
import { DayPickerRangeController } from 'react-dates';
import { useDateRange } from '../BoxBooking/DateRangeSingle/context';
import { GlobalContext } from '@/store/Context/GlobalContext';
import moment, { Moment } from 'moment';
import RenderDay from '../BoxBooking/DateRangeSingle/RenderDay';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';

const EmptyRoomCalenda = () => {
  const dateStart = useSelector<ReducersList, string | null>((state) => state.booking.startDate);
  const dateEnd = useSelector<ReducersList, string | null>((state) => state.booking.endDate);
  const { isDayBlocked, isOutsideRange } = useDateRange();
  const { width } = useContext(GlobalContext);
  const _renderDayContents = (day: Moment) => <RenderDay day={day} />;

  return useMemo(
    () => (
      <Grid className="emptyRoomCalenda">
        <DayPickerRangeController
          startDate={!!dateStart ? moment(dateStart) : moment()}
          endDate={!!dateEnd ? moment(dateEnd) : null}
          onDatesChange={() => {}}
          focusedInput={null}
          onFocusChange={null}
          isDayBlocked={isDayBlocked}
          numberOfMonths={width === 'xs' ? 1 : 2}
          isOutsideRange={isOutsideRange}
          hideKeyboardShortcutsPanel
          renderDayContents={_renderDayContents}
        />
      </Grid>
    ),
    [dateEnd, dateStart, width]
  );
};

export default memo(EmptyRoomCalenda);
