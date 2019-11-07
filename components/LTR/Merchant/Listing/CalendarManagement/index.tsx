import React, { Fragment, FC, useRef } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import FullCalendarNoSSR from '@/components/FullCalendarNoSSR';

interface IProps {
  classes?: any
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({

  })
);

const CalendarManagement: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {} = props;
  const refCalendar = useRef('refCalendar');
  const handleDateClick = (arg) => { // bind with an arrow function
    alert(arg.dateStr)
  };
  return (
    <Fragment>
      <FullCalendarNoSSR myRef={refCalendar}
                         defaultView="dayGridMonth"
                         selectable={true}
                         dateClick={handleDateClick}
                         events={[
                           { title: 'event 1', date: '2019-04-01' },
                           { title: 'event 2', date: '2019-04-02' }
                         ]}/>
    </Fragment>
  );
};

export default CalendarManagement;
