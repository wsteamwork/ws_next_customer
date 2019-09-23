import React, { FC, useState, ChangeEvent, useEffect } from 'react';
import { withStyles, Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';
import mainColor from '@/styles/constants/colors';
import { CheckboxProps } from '@material-ui/core/Checkbox';
import { Dispatch } from 'redux';
import { connect, useSelector } from 'react-redux';
import { SearchFilterState, SearchFilterAction } from '@/store/Redux/Reducers/Search/searchFilter';
import { useTranslation } from 'react-i18next';
import { ReducersType, ReducersList } from '@/store/Redux/Reducers';
import { compose } from 'recompose';

interface IProps {
  filter: SearchFilterState;
  updateBookingType: (type: number) => void;
  updateRoomType: (type: number) => void;
}

export const CustomCheckbox = withStyles({
  root: {
    color: mainColor.primary,
    '&$checked': {
      color: mainColor.primary
    }
  }
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);
const CheckboxList: FC<IProps> = (props) => {
  const { filter, updateBookingType, updateRoomType } = props;
  const { bookingType, roomType } = filter;
  const [state, setState] = useState({
    checkedB: false
  });

  const { t } = useTranslation();

  const handleChange = (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [name]: event.target.checked });
  };
  const handleRoomType = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked === true) {
      updateRoomType(3);
    } else {
      updateRoomType(0);
    }
  };
  const handleBookingType = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked === true) {
      updateBookingType(1);
    } else {
      updateBookingType(2);
    }
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <CustomCheckbox
            checked={bookingType === 1}
            onChange={handleBookingType}
            value="bookingType"
          />
        }
        label={t('rooms:filterRooms:bookByHour')}
      />
      <FormControlLabel
        control={
          <CustomCheckbox
            checked={state.checkedB}
            onChange={handleChange('checkedB')}
            value="checkedB"
          />
        }
        label={t('book:bookingForm:toWork')}
      />
      <FormControlLabel
        control={
          <CustomCheckbox checked={roomType === 3} onChange={handleRoomType} value="roomType" />
        }
        label={t('home:searchVilla')}
      />
    </FormGroup>
  );
};
const mapStateToProps = (state: ReducersType) => {
  return {
    filter: state.searchFilter
  };
};
const mapDispatchToProps = (dispatch: Dispatch<SearchFilterAction>) => {
  return {
    updateBookingType: (type: number) => {
      dispatch({
        type: 'SET_BOOKING_TYPE',
        bookingType: type
      });
    },
    updateRoomType: (type: number) => {
      dispatch({
        type: 'SET_ROOM_TYPE',
        roomType: type
      });
    }
  };
};

export default compose<IProps, any>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CheckboxList);
