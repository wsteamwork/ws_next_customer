import React, { useMemo } from 'react';
import GridContainer from '@/components/Layout/Grid/Container';
import { Grid } from '@material-ui/core';
import SearchComponent from '.';
import NavHeaderHome from '@/components/Toolbar/NavHeaderHome';
import CheckboxList from '../CheckboxList/index';
import { useTranslation } from 'react-i18next';
const SearchHome = () => {
  const { t } = useTranslation();

  return useMemo(
    () => (
      <GridContainer xs={12} classNameItem="searchHome">
        <NavHeaderHome />
        <GridContainer xs={11} md={9} classNameItem="searchHome__searchCenter">
          <Grid className="searchHome__title">
            <h3>{t('home:searchComponent:enjoy')}</h3>
          </Grid>

          <SearchComponent className="searchHome__content" showGuestRoom={true}></SearchComponent>

          <Grid className="searchHome__checkbox">
            <CheckboxList />
          </Grid>
        </GridContainer>
        <GridContainer xs={12} md={10} classNameItem="searchHome__opa"></GridContainer>
      </GridContainer>
    ),
    [t]
  );
};

export default SearchHome;
