import React, { FC, memo } from 'react';
import { Grid } from '@material-ui/core';
import SearchAutoSuggestion from '../Home/SearchAutoSuggestion';
import DateRangeSearch from '../Home/DateRangeSearch';
import ChooseGuestRoom from '../Home/ChooseGuestRoom';
import ButtonGlobal from '../ButtonGlobal';
import { useTranslation } from 'react-i18next';

interface IProps {
  className?: string;
  showChoose?: boolean;
}

const SearchComponent: FC<IProps> = (props) => {
  const { className, showChoose } = props;
  const { t } = useTranslation();

  return (
    <Grid container spacing={1} className={className}>
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
  );
};

export default memo(SearchComponent);
