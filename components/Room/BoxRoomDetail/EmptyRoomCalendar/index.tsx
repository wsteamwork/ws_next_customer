import React, { FC, useContext, useMemo, memo, Fragment } from 'react';
import { DayPickerRangeController } from 'react-dates';
import { useDateRange } from '../../BoxBooking/DateRangeSingle/context';
import { GlobalContext } from '@/store/Context/GlobalContext';
import moment, { Moment } from 'moment';
import RenderDay from '../../BoxBooking/DateRangeSingle/RenderDay';
import { Grid, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    name: {
      fontWeight: 900,
      margin: '1rem 0 1rem 0'
    }
  })
);
interface IProps {
  classes?: any;
}

const EmptyRoomCalendar: FC<IProps> = (props) => {
  const dateStart = useSelector<ReducersList, string | null>((state) => state.booking.startDate);
  const dateEnd = useSelector<ReducersList, string | null>((state) => state.booking.endDate);
  const { isDayBlocked, isOutsideRange, onNextMonthClick } = useDateRange();
  const { width } = useContext(GlobalContext);
  const _renderDayContents = (day: Moment) => <RenderDay day={day} />;
  const { t } = useTranslation();
  const classes = useStyles(props);

  return useMemo(
    () => (
      <Fragment>
        <Typography variant="h5" className={classes.name}>
          {t('rooms:emptyCalender')}
        </Typography>
        <Grid className="EmptyRoomCalendar">
          <DayPickerRangeController
            daySize={width === 'xl' || width === 'lg' ? 50 : (width === 'md' ? 40 : 38)}
            startDate={!!dateStart ? moment(dateStart) : moment()}
            endDate={!!dateEnd ? moment(dateEnd) : null}
            onDatesChange={() => { }}
            // onNextMonthClick={onNextMonthClick}
            focusedInput={null}
            onFocusChange={null}
            isDayBlocked={isDayBlocked}
            numberOfMonths={width === 'xs' ? 1 : 2}
            isOutsideRange={isOutsideRange}
            hideKeyboardShortcutsPanel
            renderDayContents={_renderDayContents}
            noBorder
          />
        </Grid>
      </Fragment>
    ),
    [dateEnd, dateStart, width]
  );
};

export default memo(EmptyRoomCalendar);
