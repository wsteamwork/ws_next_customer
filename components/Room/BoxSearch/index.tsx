import React, { FC, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Paper, Grid, Typography, Button, Collapse } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import SearchAutoSuggestion from '@/components/Home/SearchAutoSuggestion';
import DateRangeSearch from '@/components/Home/DateRangeSearch';
import ChooseGuestRoom from '@/components/Home/ChooseGuestRoom';
import ButtonGlobal from '@/components/ButtonGlobal';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import moment from 'moment';
import { DEFAULT_DATE_FORMAT } from '@/utils/store/global';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';

interface IProps {
  classes?: any;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      padding: '8px 0px',
      margin: `${theme.spacing(4)}px 0px`
    },
    btnChange: {
      color: '#41C9BC',
      border: '1px solid #41C9BC',
      textTransform: 'initial'
    }
  })
);

const BoxSearch: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {} = props;
  const { t } = useTranslation();
  const [collapseSearch, setCollapseSearch] = useState<boolean>(false);
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.roomPage.room);
  const numberGuest = useSelector<ReducersList, number>((state) => state.searchFilter.guestsCount);
  const numberRoom = useSelector<ReducersList, number>((state) => state.searchFilter.roomsCount);
  const startDate = useSelector<ReducersList, string | null>(
    (state) => state.searchFilter.startDate
  );
  const endDate = useSelector<ReducersList, string | null>((state) => state.searchFilter.endDate);

  const checkIn = moment(startDate).format(DEFAULT_DATE_FORMAT);
  const checkOut = endDate ? ` - ${moment(endDate).format(DEFAULT_DATE_FORMAT)}` : '';

  const handleCollapse = () => {
    setCollapseSearch(!collapseSearch);
  };

  return (
    room && (
      <Paper className={classes.root} elevation={0}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={9}>
            <Collapse in={!collapseSearch}>
              <div>
                <Typography variant="h5" gutterBottom>
                  {room.details.data[0].name} - {room.district.data.name} - {room.city.data.name}
                </Typography>
                <Typography variant="subtitle2" color="textPrimary">
                  {t('room:lookingFor')} {checkIn}
                  {checkOut}, {numberGuest} {t('room:guests')}, {numberRoom} {t('room:rooms')}
                </Typography>
              </div>
            </Collapse>
            <Collapse in={collapseSearch}>
              <Grid container spacing={1} justify="center" alignItems={'center'}>
                <Grid item xs={12} md={4}>
                  <SearchAutoSuggestion />
                </Grid>
                <Grid item xs={12} md={4}>
                  <DateRangeSearch />
                </Grid>
                <Grid item xs={12} md={2}>
                  <ChooseGuestRoom />
                </Grid>
                <Grid item xs={12} md={2}>
                  <ButtonGlobal padding="0px" width="100%">
                    {t('home:searchComponent:search')}
                  </ButtonGlobal>
                </Grid>
              </Grid>
            </Collapse>
          </Grid>

          <Grid item xs={2} container justify="flex-end" alignItems="center">
            <Button
              variant="outlined"
              className={classes.btnChange}
              size="large"
              onClick={handleCollapse}>
              {!collapseSearch ? t('room:changeSearch') : t('room:cancel')}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    )
  );
};

export default BoxSearch;
