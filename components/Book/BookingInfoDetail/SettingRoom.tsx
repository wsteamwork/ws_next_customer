import React, { useContext, FC } from 'react';
import { BookingDetailContext } from '@/store/Context/Booking/BookingDetailContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { BookingPriceCalculatorRes } from '@/types/Requests/Booking/BookingResponses';
import { useSelector } from 'react-redux';
import CustomPopper from '@/components/CustomPopper';
import { Grid, Typography } from '@material-ui/core';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import mainColor from '@/styles/constants/colors';
import { formatMoney } from '@/utils/mixins';

const SettingRoom: FC = () => {
  const dataCalculate = useSelector<ReducersList, BookingPriceCalculatorRes>(
    (state) => state.booking.dataCalculate
  );
  const { state } = useContext(BookingDetailContext);
  const { room } = state;

  return (
    <CustomPopper
      arrow
      placement="top"
      content={
        <Grid className="settingBooking">
          {room &&
            !!room.settings &&
            (room!.settings.no_booking_cancel == 1 ? (
              <Typography variant="caption" style={{ padding: '0px 10px' }}>
                {`Khi đặt chỗ của quý khách đã được xác nhận, Quý khách sẽ phải trả 50% số tiền đặt phòng ${formatMoney(
                  dataCalculate.total_fee / 2
                )} nếu quý khách hủy đặt phòng trước ngày ${moment
                  .unix(dataCalculate.checkin)
                  .subtract(room!.settings.days, 'day')
                  .locale('vi')
                  .format(
                    'HH:mm Do MMMM YYYY'
                  )}. Sau thời gian đó, toàn bộ số tiền đặt phòng sẽ không được hoàn lại nếu quý khách hủy hoặc vắng mặt`}
              </Typography>
            ) : (
              <Grid>
                {moment
                  .unix(dataCalculate.checkin)
                  .subtract(room!.settings.days, 'day')
                  .diff(moment.now(), 'days') <= room!.settings.days && (
                  <Typography variant="caption" style={{ padding: '0px 10px' }}>
                    {`Khi đặt chỗ của quý khách đã được xác nhận, quý khách không thể hủy hoặc thay đổi đặt chỗ đó.Quý khách sẽ phải trả toàn bộ số tiền đặt phòng ${formatMoney(
                      dataCalculate.total_fee
                    )} nếu quý khách vắng mặt.`}
                  </Typography>
                )}
              </Grid>
            ))}
        </Grid>
      }>
      <span>
        <FontAwesomeIcon
          icon={faQuestionCircle}
          size="1x"
          color={mainColor.primary}></FontAwesomeIcon>
      </span>
    </CustomPopper>
  );
};

export default SettingRoom;
