import React, { FC } from 'react';
import { Paper } from '@material-ui/core';
import ItemSeach from './ItemSeach';
import { SearchSuggestRes } from '@/types/Requests/Search/SearchResponse';

interface IProps {
  item: SearchSuggestRes;
}

const ListResSearch: FC<IProps> = (props) => {
  const { item } = props;

  return (
    <Paper elevation={0} className="searchResponse">
      <div className="viewTitle">
        <p className="title">Kết quả tìm kiếm</p>
      </div>

      {item.city && item.city.map((i, index) => <ItemSeach key={index} item={i}></ItemSeach>)}
      {item.district &&
        item.district.map((i, index) => <ItemSeach key={index} item={i}></ItemSeach>)}
      {item.room && item.room.map((i, index) => <ItemSeach key={index} item={i}></ItemSeach>)}
    </Paper>
  );
};

export default ListResSearch;
