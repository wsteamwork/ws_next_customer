import React, { Fragment, FC, useRef, useEffect, useMemo, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Snackbar, Grid } from '@material-ui/core';
import FullCalendarNoSSR from '@/components/FullCalendarNoSSR';
import moment from 'moment';
import { DEFAULT_DATE_FORMAT } from '@/utils/store/global';
import { axios_merchant } from '@/utils/axiosInstance';
import { BlockCalendarReq, UnlockCalendarReq } from '@/types/Requests/Calendar/CalendarReq';
import { UpdateBlockRes, ScheduleRes, BookingCalendarRes, BookingEvents } from '@/types/Requests/Calendar/CalendarRes';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import DialogActionCalendar from '@/components/LTR/Merchant/Listing/CalendarManagement/DialogActionCalendar';
import MySnackbarContentWrapper from '@/components/Profile/EditProfile/MySnackbarContentWrapper';
import { useTranslation } from 'react-i18next';

interface IProps {
  classes?: any,
  idRoom: number
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    blockDay: {
      // background: 'repeating-linear-gradient(-45deg,#cccccc, #cccccc 1px,#f2f2f2 1px,#f2f2f2 50px)',
      // backgroundBlendMode: 'lighten',
      backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23f5f5f5\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 40L40 0H20L0 20M40 40V20L20 40\'/%3E%3C/g%3E%3C/svg%3E")',
      color: '#fff',
      cursor: 'not-allowed',
      pointerEvents: 'none'
    },
    boxCalendar: {
      margin: '32px 0'
    },
    boxSugguest:{
      width:25,
      height:25,
      borderRadius: 4,
      display: 'inline-flex',
      margin: 8,
    },
    boxItem:{
      display:'flex',
      alignItems:'center'
    }
  })
);

const CalendarManagement: FC<IProps> = (props) => {
  const classes                         = useStyles(props);
  const { idRoom }                      = props;
  const refCalendar                     = useRef('refCalendar');
  const [dataBlock, setDataBlock]       = useState([]);
  const [dataBooking, setDataBooking]   = useState([]);
  const [period, setPeriod]             = useState<string[]>([]);
  const [openDialog, setOpenDialog]     = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [reload, setReload]             = useState(false);
  const { t }                           = useTranslation();
  const today                           = moment().format(DEFAULT_DATE_FORMAT);
  const oneYearLater                    = moment(today).add(1.2, 'years').format(DEFAULT_DATE_FORMAT);

  const putApiLock = (period: string[]) => {
    const data: BlockCalendarReq = {
      room_id: idRoom,
      room_time_blocks: [period]
    };
    axios_merchant
      .put('rooms/update-block?option=room_time_blocks', data)
      .then(() => {
        setOpenSnackbar(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
    setOpenDialog(false);
  };

  const putApiUnlock = (period: string[]) => {
    const data: UnlockCalendarReq = {
      room_id: idRoom,
      unlock_days: [period]
    };

    axios_merchant
      .put('rooms/update-block?option=unlock_days', data)
      .then(() => {
        setOpenSnackbar(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
    setOpenDialog(false);
  };

  const getDataBlock = async (): Promise<ScheduleRes> => {
    const url = `rooms/schedule/${idRoom}`;
    try {
      const res: AxiosRes<ScheduleRes> = await axios_merchant.get(url);
      setDataBlock(res.data.data.blocks);
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const getDataBooking = async (): Promise<any> => {
    const url = `get-all-booking-calendar/${idRoom}`;

    try {
      const res: AxiosRes<any> = await axios_merchant.get(url);
      setDataBooking(res.data.data);
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  // useMemo(() => getDataBlock(), [dataBlock]);

  useEffect(() => {
    getDataBlock();
    getDataBooking();
    setReload(true);
  }, []);

  useEffect(() => {
  }, [dataBooking, dataBlock]);


  const dataTest = [
    {
      events: [
        {
          id: 16,
          booking_id: 19,
          uuid: 'CT0KLV6LZE',
          title: 'Mã hợp đồng: CT0KLV6LZE - Giá trị: 137133300 đ',
          start: '2019-11-25 00:00:00',
          end: '2020-04-25 23:59:59'
        }
      ],
      color: '#fb8c00',
      textColor: '#fff',
    },
    {
      events: [
        {
          id: 11229,
          uuid: 'OwGVrQxA',
          title: 'Mã đặt phòng: OwGVrQxA - Giá trị: 13213412 đ',
          start: '2019-12-14 10:30:00',
          end: '2019-12-17 14:30:00'
        },
        {
          id: 11230,
          uuid: 'AxeB3Kwr',
          title: 'Mã đặt phòng: AxeB3Kwr - Giá trị: 110000 đ',
          start: '2019-11-18 10:30:00',
          end: '2019-11-20 14:30:00'
        }
      ],
      color: '#00897b',
      textColor: '#fff',
    }
  ];
  return (
    <div>
      <Grid container className = {classes.boxCalendar}>
        <Grid item xs={6} sm={4} className={classes.boxItem}>
          <div className={classes.boxSugguest} style={{backgroundColor:'#fb8c00'}}/>
          <span>Booking dài hạn</span>
        </Grid>
        <Grid item xs={6} sm={4} className={classes.boxItem}>
          <div className={classes.boxSugguest} style={{backgroundColor:'#00897b'}}/>
          <span>Booking ngắn hạn</span>
        </Grid>
        <Grid item xs={6} sm={4} className={classes.boxItem}>
          <div className={classes.boxSugguest} style={{background: 'repeating-linear-gradient(-45deg,#cccccc, #cccccc 5px,#f2f2f2 5px,#f2f2f2 10px)'}}/>
          <span>Ngày đã khóa</span>
        </Grid>
      </Grid>

      {useMemo(() => (
        <FullCalendarNoSSR myRef = {refCalendar}
                           locale = {t('shared:lang')}
                           defaultView = 'dayGridMonth'
                           selectable = {true}
                           selectAllow = {(info) => {
                             let temp = 0;
                             if(dataBooking.length !== 0){
                               dataBooking.map((dates:any)=>{
                                 dates.events.map((day:BookingEvents)=>{
                                   let startDayBooking = moment(day.start).format(DEFAULT_DATE_FORMAT);
                                   let endDayBooking = moment(day.end).format(DEFAULT_DATE_FORMAT);
                                   if(info.startStr >= startDayBooking && info.startStr < endDayBooking) {
                                     temp++;
                                   };
                                 })
                               });
                             }
                             return temp <= 0;
                             //
                             // if (info.startStr === '2019-11-20') return true;
                             // return false;
                           }}
                           selectOverlap={(x)=>
                           {
                             console.log(x);
                             return x.startEditable === '2019-11-20';
                           }}
                           eventSources = {
                             dataBooking
                           }
                           validRange = {() => {
                             return {
                               start: today,
                               end: oneYearLater
                             };
                           }}
                           dayRender = {(day) => {
                             const dayOnCalendar = moment(day.date).format(DEFAULT_DATE_FORMAT);
                             dataBlock.map((date) => {
                               if (date === dayOnCalendar) {
                                 day.el.className += ` ${classes.blockDay}`;
                               }
                             });
                           }}
                           select = {(info) => {
                             setPeriod([
                               info.startStr,
                               moment(info.endStr).subtract(1, 'days').format(DEFAULT_DATE_FORMAT)
                             ]);
                             setOpenDialog(true);
                           }}
          // eventRender={(event, el)=>{console.log(event)}}
        />
      ), [dataBooking, dataBlock])}
      <DialogActionCalendar open = {openDialog}
                            handleClose = {() => {
                              setOpenDialog(false);
                            }}
                            handleBlock = {() => {
                              putApiLock(period);
                            }}
                            handleUnlock = {() => {
                              putApiUnlock(period);
                            }}
                            startDate = {period[0]}
                            endDate = {period[1]}
      />
      <Snackbar
        anchorOrigin = {{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open = {openSnackbar}
        autoHideDuration = {3000}
        onClose = {() => setOpenSnackbar(false)}>
        <MySnackbarContentWrapper
          variant = 'success'
          message = {t('shared:success')}
          onClose = {() => setOpenSnackbar(false)} />
      </Snackbar>
    </div>

  );
};

export default CalendarManagement;
