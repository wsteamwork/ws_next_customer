import GridContainer from '@/components/Layout/Grid/Container';
import NavHeaderHome from '@/components/Toolbar/NavHeaderHome';
import { Grid } from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchComponent from '.';
import CheckboxList from '../CheckboxList/index';
import TabChangeHome from '@/components/Home/SearchComponent/TabChangeHome';
import { TabPanel } from '@/pages/host/update-listing/[id]';
import SearchHomeLT from '@/components/LTR/LTHome/SearchHomeLT';

const SearchHome = () => {
  const { t }                   = useTranslation();
  const [indexTab, setIndexTab] = useState<number>(0);

  return useMemo(
    () => (
      <GridContainer xs = {12} classNameItem = 'searchHome'>
        <NavHeaderHome />

        <GridContainer xs = {12} md = {11} lg={10} classNameItem = 'searchHome__opa' >
          <TabChangeHome value = {indexTab}
                         onChange={(e,i)=>setIndexTab(i)}
                         tab = {[
                           { label: 'Homestay' },
                           { label: 'Thuê dài hạn' }
                         ]} />
          <TabPanel value={indexTab} index={0}>
            <GridContainer xs = {11} md = {11}>
              <Grid className = 'searchHome__title'>
                <h3>{t('home:searchComponent:enjoy')}</h3>
              </Grid>

              <SearchComponent className="searchHome__content" showGuestRoom={true}/>

              <Grid className="searchHome__checkbox">
                <CheckboxList />
              </Grid>
            </GridContainer>
          </TabPanel>
          <TabPanel value={indexTab} index={1}>
            <GridContainer xs = {11} md = {11}>
              <Grid className = 'searchHome__title'>
                <h3>{t('home:searchComponent:sloganLongterm')}</h3>
              </Grid>

              <div className="searchHome__content">
                <SearchHomeLT/>
              </div>

            </GridContainer>
          </TabPanel>
        </GridContainer>
      </GridContainer>
    ),
    [t,indexTab]
  );
};

export default SearchHome;
