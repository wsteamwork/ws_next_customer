import TabChangeHome from '@/components/Home/SearchComponent/TabChangeHome';
import GridContainer from '@/components/Layout/Grid/Container';
import SearchHomeLT from '@/components/LTR/LTHome/SearchHomeLT';
import NavHeaderHome from '@/components/Toolbar/NavHeaderHome';
import { TabPanel } from '@/pages/host/update-listing/[id]';
import { ReducersList } from '@/store/Redux/Reducers';
import { SearchFilterAction } from '@/store/Redux/Reducers/Search/searchFilter';
import { axios } from '@/utils/axiosInstance';
import { Grid } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import SearchComponent from '.';
import CheckboxList from '../CheckboxList/index';

const SearchHome = () => {
  const { t } = useTranslation();
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>((state) => state.searchFilter.leaseTypeGlobal);
  const [indexTab, setIndexTab] = useState<number>(leaseTypeGlobal);
  const [data, setData] = useState<number>();
  const dispatch = useDispatch<Dispatch<SearchFilterAction>>();
  const changeLeaseTypeGlobal = (i: 0 | 1) => {
    // console.log(i);
    setIndexTab(i);
    dispatch({
      type: 'setLeaseTypeGlobal',
      leaseTypeGlobal: i,
      leaseTypePathName: i ? '/long-term-rooms' : '/rooms'
    });
  };
  const getDataLongTermRoom = async (): Promise<any> => {
    const res = await axios.get(`count-long-term-rooms`);
    setData(res.data.data.total_room);
    // console.log(data);
  };

  useEffect(() => {
    getDataLongTermRoom();
  }, [data])

  return useMemo(
    () => (
      <GridContainer xs={12} classNameItem='searchHome'>
        <NavHeaderHome />
        <div className="searchHomeLayer">
          <GridContainer xs={11} sm={11} md={11} lg={10} classNameItem='searchHome__opa' >
            <TabChangeHome value={indexTab}
              // @ts-ignore
              onChange={(e, i) => changeLeaseTypeGlobal(i)}
              tab={[
                { label: `${t('home:shortTermTab')}` },
                { label: `${t('home:longTermTab')}` }
              ]} />
            <TabPanel value={indexTab} index={0}>
              <Fade in={indexTab == 0} timeout={100}>
                <GridContainer xs={11} md={11}>
                  <Grid className='searchHome__title'>
                    <h3>{t('home:searchComponent:enjoy')}</h3>
                  </Grid>

                  <SearchComponent className="searchHome__content" showGuestRoom={true} />

                  <Grid className="searchHome__checkbox">
                    <CheckboxList />
                  </Grid>
                </GridContainer>
              </Fade>
            </TabPanel>
            <TabPanel value={indexTab} index={1}>
              <Fade in={indexTab == 1} timeout={100}>
                <GridContainer xs={11} md={11}>
                  <Grid className='searchHome__title'>
                    <h3>{t('home:searchComponent:sloganLongtermFirstHalf')} {data} {t('home:searchComponent:sloganLongtermSecondHalf')}</h3>
                  </Grid>

                  <div className="searchHome__content">
                    <SearchHomeLT showPlaces />
                  </div>
                </GridContainer>
              </Fade>
            </TabPanel>
          </GridContainer>
        </div>
      </GridContainer>
    ),
    [t, indexTab, data]
  );
};

export default SearchHome;
