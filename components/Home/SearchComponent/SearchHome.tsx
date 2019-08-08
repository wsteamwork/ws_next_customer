import React, { useContext, useMemo } from 'react';
import GridContainer from '@/components/Layout/Grid/Container';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import CheckboxList from '../CheckboxList';
import SearchComponent from '.';
import { GlobalContext } from '@/store/Context/GlobalContext';

const SearchHome = () => {
  const { t } = useTranslation();
  const { dispatch } = useContext(GlobalContext);

  const handleOverlay = () => {
    dispatch({ type: 'setOverlay', payload: true });
  };

  return useMemo(
    () => (
      <GridContainer xs={12} classNameItem="searchHome">
        <img
          src={`${IMAGE_STORAGE_LG}background.jpg`}
          alt="Westay - HomeStay cho người Việt"
          className="searchHome__image"
        />
        <Grid onClick={handleOverlay}>
          <GridContainer xs={11} md={9} classNameItem="searchHome__searchCenter">
            <Grid className="searchHome__title">
              <h3>{t('home:searchComponent:enjoy')}</h3>
            </Grid>

            <SearchComponent className="searchHome__content"></SearchComponent>

            <Grid className="searchHome__checkbox">
              <CheckboxList />
            </Grid>
          </GridContainer>
          <GridContainer xs={12} md={10} classNameItem="searchHome__opa"></GridContainer>
        </Grid>
      </GridContainer>
    ),
    [t]
  );
};

export default SearchHome;
