import React, { FC } from 'react';
import { Grid } from '@material-ui/core';
import {
  CityEntity,
  DistrictEntity,
  RoomEntity,
  IS_SEARCH_CITY,
  IS_SEARCH_DISTRICT
} from '@/types/Requests/Search/SearchResponse';

type CheckType = CityEntity | DistrictEntity | RoomEntity;

interface IProps {
  item: CheckType;
}

const ItemSeach: FC<IProps> = (props) => {
  const { item } = props;

  return (
    <Grid className="itemSearchResponse">
      <Grid container>
        <Grid item xs={9} className="left">
          <p className="name">{item.name}</p>
        </Grid>
        <Grid item xs={3} className="right">
          <span className="citySearchResponse">
            {item.type === IS_SEARCH_CITY
              ? `City`
              : item.type === IS_SEARCH_DISTRICT
              ? 'District'
              : 'Room'}
          </span>
        </Grid>
      </Grid>

      <Grid container className="desc">
        <Grid item xs={5} className="left">
          <p>{item.country}</p>
        </Grid>
        <Grid item xs={7} className="right">
          {item.number_room !== 0 && item.number_room! && <p>{item.number_room} chỗ ở</p>}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ItemSeach;
