import React, { ChangeEvent, useState, useContext, FC } from 'react';
import {
  Hidden,
  Tabs,
  Tab,
  Grid,
  BottomNavigation,
  BottomNavigationAction
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import {
  PersonOutlineRounded,
  NotificationsNoneRounded,
  BookmarksOutlined,
  PersonOutlined
} from '@material-ui/icons';
import GridContainer from '../Layout/Grid/Container';
import Link from 'next/link';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { ProfileInfoRes } from '@/types/Requests/Profile/ProfileResponse';
import EditProfile from './EditProfile';
import BookingProfile from './BookingProfile';
import { useTranslation } from 'react-i18next';

const MenuProfile: FC = (props) => {
  const { t } = useTranslation();
  const { width } = useContext(GlobalContext);
  const [value, setValue] = useState<number>(0);
  const profile = useSelector<ReducersList, ProfileInfoRes>((state) => state.iProfile.profile);

  const handleChange = (event: ChangeEvent<{}>, value: number) => {
    setValue(value);
  };

  return (
    <GridContainer xs={11} lg={8} className={'menuProfile'}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3} className="tabProfilePc">
          <Tabs
            value={value}
            onChange={handleChange}
            orientation="vertical"
            variant={width == 'xs' ? 'scrollable' : 'fullWidth'}
            indicatorColor="primary"
            textColor="primary"
            scrollButtons="off">
            <Tab
              label={t('profile:userProfile')}
              className="sideNavItemText"
              icon={<PersonOutlineRounded />}></Tab>

            <Tab
              label={t('profile:listRooms')}
              className={'sideNavItemText'}
              icon={<NotificationsNoneRounded />}></Tab>
          </Tabs>

          <Link href={`/user/${profile.id}`}>
            <a className={'viewProfileLink viewProfileTab flex_rowCenter'}>
              {t('profile:watchInfo')}
            </a>
          </Link>
        </Grid>
        <Hidden lgUp implementation="css">
          <BottomNavigation
            value={value}
            onChange={handleChange}
            showLabels
            className={'NaviBottom'}>
            <BottomNavigationAction
              label={t('profile:userProfile')}
              value={0}
              icon={<PersonOutlined />}
            />
            <BottomNavigationAction
              label={t('profile:listRooms')}
              value={1}
              icon={<BookmarksOutlined />}
            />
          </BottomNavigation>
        </Hidden>

        <Grid item xs={12} md={9}>
          {value === 0 && <EditProfile />}

          {value === 1 && <BookingProfile />}
        </Grid>
      </Grid>
    </GridContainer>
  );
};

export default MenuProfile;
