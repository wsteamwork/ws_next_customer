import createStyles from '@material-ui/core/styles/createStyles';
import React, { FC, Fragment, useContext, useState, useEffect, ChangeEvent } from 'react';
import { RoomFilterContext, IRoomFilterContext } from '@/store/Context/Room/RoomFilterContext';

import _ from 'lodash';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import Paper from '@material-ui/core/Paper/Paper';
import Grey from '@material-ui/core/colors/grey';
import Blue from '@material-ui/core/colors/blue';
import { TypeSelect } from '@/types/Requests/ResponseTemplate';
import { useExpandableList } from '@/store/Hooks/filterHooks';
import { arrayFilterCheckBoxEvent } from '@/utils/mixins';
import { Typography, Theme, makeStyles } from '@material-ui/core';

interface IProps {
  classes?: any;
  setIndex(value: number): void;
}

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    ul: {
      listStyleType: 'none',
      marginBlockStart: '0px',
      paddingInlineStart: '0.4rem',
      paddingBlockStart: '0.5rem',
      marginBlockEnd: 0
    },
    checkboxRoot: {
      padding: 5
    },
    showMore: {
      textAlign: 'center',
      padding: 5,
      backgroundColor: Grey[200],
      color: Blue[400]
    },
    title: {
      fontWeight: 700
    }
  })
);

const SelectMobile: FC<IProps> = (props) => {
  const { setIndex } = props;
  const classes = useStyles(props);
  const { state, dispatch } = useContext<IRoomFilterContext>(RoomFilterContext);
  const { roomTypes, roomTypesFilter } = state;
  const [roomTypeLocal, setRoomTypeLocal] = useState<number[]>(roomTypesFilter);

  const [roomTypeChunks, isRoomTypeExpand, setRoomTypeExpand] = useExpandableList<number>(
    roomTypes
  );

  // const roomTypeEvent = (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
  //   let roomTypeLists = arrayFilterCheckBoxEvent(roomTypeLocal, e, checked);
  //   roomTypeLists = _.sortBy(roomTypeLists);

  //   setRoomTypeLocal(roomTypeLists);
  // };

  // useEffect(() => {
  //   if (roomTypes.length === 0) loadFilter(dispatch);
  // }, []);

  return (
    <Fragment>
      <Typography variant="subtitle2">Loại phòng</Typography>
      {/* {roomTypes.length > 0 ? (
        <Fragment>
          <ul className={classes.ul}>
            {_.map(roomTypeChunks, (o) => (
              <li key={o.id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={o.id.toString()}
                      color="primary"
                      onChange={roomTypeEvent}
                      value={o.id.toString()}
                      checked={_.indexOf(roomTypeLocal, o.id) !== -1}
                      classes={{
                        root: classes.checkboxRoot
                      }}
                    />
                  }
                  label={o.value}
                />
              </li>
            ))}
          </ul>
          <Paper
            elevation={0}
            className={classes.showMore}
            onClick={() => setRoomTypeExpand(!isRoomTypeExpand)}>
            {isRoomTypeExpand ? 'Thu gọn' : 'Mở rộng'}
          </Paper>
        </Fragment>
      ) : (
        ''
      )} */}
    </Fragment>
  );
};

export default SelectMobile;
