import React, { FC } from 'react';
import { Paper, Grid } from '@material-ui/core';
import { SearchSuggestRes } from '@/types/Requests/Search/SearchResponse';
import { useTranslation } from 'react-i18next';
import Lottie, { Options } from 'react-lottie';
import simpleLoading from '@/assets/lottie/simple-loading.json';
import LazyLoad from 'react-lazyload';
import dynamic from 'next/dynamic';

const ItemSeach = dynamic(() => import('./ItemSeach'));

interface IProps {
  item: SearchSuggestRes;
}

const defaultOptions: Options = {
  loop: true,
  autoplay: true,
  animationData: simpleLoading
};

const ListResSearch: FC<IProps> = (props) => {
  const { item } = props;
  const { t } = useTranslation();

  return (
    <LazyLoad>
      <Paper elevation={0} className="searchResponse">
        <Grid className="viewTitle">
          <p className="title">{t('home:SearchAutocomplete:searchResults')}</p>
        </Grid>

        {Array.isArray(item) ? (
          <Grid className="notResult">
            <Lottie options={defaultOptions} height="50%" width="50%"></Lottie>
            <p>{t('home:SearchAutocomplete:noResult')}</p>
          </Grid>
        ) : (
          <Grid>
            {item.city && item.city.map((i, index) => <ItemSeach key={index} item={i}></ItemSeach>)}
            {item.district &&
              item.district.map((i, index) => <ItemSeach key={index} item={i}></ItemSeach>)}
            {item.room && item.room.map((i, index) => <ItemSeach key={index} item={i}></ItemSeach>)}
          </Grid>
        )}
      </Paper>
    </LazyLoad>
  );
};

export default ListResSearch;
