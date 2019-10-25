import React, { Fragment, FC, useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Grid, Button } from '@material-ui/core';
import GpsFixed from '@material-ui/icons/GpsFixedRounded';
import SearchAutoSuggestion from '@/components/Home/SearchAutoSuggestion';
import ButtonGlobal from '@/components/ButtonGlobal';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { NumberRoomCity } from '@/types/Requests/Rooms/RoomResponses';
import { ParsedUrlQueryInput } from "querystring";
import Router from 'next/router';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { SearchFilterState } from '@/store/Redux/Reducers/Search/searchFilter';

interface IProps {
  classes?: any
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    btnPlace:{
      margin:'8px 16px 8px 0',
      boxShadow:'0 2px 9px -2px rgba(132,135,138,.2)',
      textTransform: 'initial',
      backgroundColor: '#fff'
    }
  })
);

const SearchHomeLT: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {} = props;
  const {t} = useTranslation();
  const { dispatch: dispatchGlobal, router } = useContext(GlobalContext);
  const cities = useSelector<ReducersList, NumberRoomCity[]>(
    (state) => state.roomHomepage.roomsCity
  );
  const filter = useSelector<ReducersList, SearchFilterState>(
    (state) => state.searchFilter
  );
  const { searchText, city_id, district_id} = filter;

  const applySearch = () => {
    dispatchGlobal({ type: 'setOverlay', payload: false });
    const pushQuery: ParsedUrlQueryInput = {
      name: city_id === undefined && district_id === undefined ? searchText : '',
      city_id: city_id ? city_id : '',
      district_id: district_id ? district_id : ''
    };

    Router.push({
      pathname: '/long-term-rooms',
      query: pushQuery
    });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={9}>
        <SearchAutoSuggestion/>
      </Grid>
      <Grid item xs={3}>
        <ButtonGlobal padding="0px" width="100%" height={60} onClick={applySearch}>
          {t('home:searchComponent:search')}
        </ButtonGlobal>
      </Grid>
      <Grid item xs={9}>
        <Button variant="contained" className={classes.btnPlace}>
          <GpsFixed style={{marginRight:8, color:'tomato'}}/>
          Vị trí của bạn
        </Button>

        {cities.map((o,i)=> (
          i < 5 ? (
            <Button key={i} variant="contained" className={classes.btnPlace}>
              {o.name_city} ({o.total_rooms})
            </Button>
          ) : (<Fragment key={i}/>)
        ))}
      </Grid>
      <Grid item xs/>
    </Grid>
  );
};

export default SearchHomeLT;
