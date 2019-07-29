import React, { FC, useEffect } from 'react';
import { Paper, Grid, List } from '@material-ui/core';
import { SearchSuggestRes } from '@/types/Requests/Search/SearchResponse';
import { useTranslation } from 'react-i18next';
import Lottie, { Options } from 'react-lottie';
import simpleLoading from '@/assets/lottie/simple-loading.json';
import LazyLoad from 'react-lazyload';
import dynamic from 'next/dynamic';

const ItemSeach = dynamic(() => import('./ItemSeach'));

interface IProps {
  data: SearchSuggestRes;
  suggestionSelected(value: string): void;
}

const defaultOptions: Options = {
  loop: true,
  autoplay: true,
  animationData: simpleLoading
};

const ListResSearch: FC<IProps> = (props) => {
  const { data, suggestionSelected } = props;
  const { t } = useTranslation();

  const renderSuggestions = () => {
    if (Array.isArray(data))
      return (
        <Grid className="noResult">
          {/* <Lottie options={defaultOptions} height="50%" width="50%"></Lottie> */}
          <p>{t('home:SearchAutocomplete:noResult')}</p>
        </Grid>
      );
    return (
      <List>
        {data.city &&
          data.city.map((i, index) => (
            <ItemSeach key={index} item={i} suggestionSelected={suggestionSelected}></ItemSeach>
          ))}
        {data.district &&
          data.district.map((i, index) => (
            <ItemSeach key={index} item={i} suggestionSelected={suggestionSelected}></ItemSeach>
          ))}
        {data.room &&
          data.room.map((i, index) => (
            <ItemSeach key={index} item={i} suggestionSelected={suggestionSelected}></ItemSeach>
          ))}
      </List>
    );
  };

  return (
    <LazyLoad>
      <Paper elevation={0} className="searchResponse">
        <Grid className="viewTitle">
          <p className="title">{t('home:SearchAutocomplete:searchResults')}</p>
        </Grid>
        {renderSuggestions()}
      </Paper>
    </LazyLoad>
  );
};

export default ListResSearch;
