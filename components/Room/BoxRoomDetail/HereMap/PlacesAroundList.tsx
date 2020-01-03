import { Grid, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, withStyles } from '@material-ui/styles';
import React, { FC, useEffect, useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import ItemAroundList from './ItemAroundList';
import {
  getGuideBookList,
  RoomReducerAction,
  RoomReducerState
} from '@/store/Redux/Reducers/Room/roomReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { ReducersList } from '@/store/Redux/Reducers';

interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    title: {
      fontWeight: 700,
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    root: {
      margin: '10px 0',
      borderRadius: 5,
      overflow: 'hidden',
      border: '1px solid #e0e0e0'
    },
    txtAddress: {
      color: '#484848'
    },
    rootTab: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      height: 240,
      margin: '10px 0',
      overflow: 'hidden',
      border: '1px solid #e0e0e0'
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`
    },
    tabPanel: {
      width: '100%'
    }
  })
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}
interface StyledTabProps {
  label: string;
}
const AntTabs = withStyles({
  root: {
    borderRight: '1px solid #e0e0e0'
  },
  indicator: {
    width: 5,
    backgroundColor: '#45C29A'
  }
})(Tabs);

const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      minWidth: 72,
      padding: 0,
      fontWeight: theme.typography.fontWeightBold,
      margin: theme.spacing(0, 6),
      fontSize: 14,
      '&:hover': {
        color: '#45C29A',
        opacity: 1
      },
      '&$selected': {
        color: '#45C29A',
        fontWeight: theme.typography.fontWeightBold
      },
      '&:focus': {
        color: '#45C29A'
      },
      [theme.breakpoints.down('xs')]: {
        margin: 0
      }
    },
    selected: {
      color: '#45C29A'
    }
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

const TabPanel: FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      style={{ width: '80%', overflowY: 'auto' }}
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      <Box p={3}>{children}</Box>
    </Typography>
  );
};
function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

const PlacesAroundList: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const [value, setValue] = useState(0);
  const { guidebooks, placesList } = useSelector<ReducersList, RoomReducerState>(
    (state) => state.roomPage
  );
  const dispatch = useDispatch<Dispatch<RoomReducerAction>>();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    getGuideBookList(dispatch);
  }, []);

  return (
    <Grid>
      {placesList.length ? (
        <Fragment>
          <Typography variant="h5" className={classes.title}>
            {t('room:nearbyPlaces')}
          </Typography>
          <Grid className={classes.rootTab}>
            <AntTabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              className={classes.tabs}>
              {guidebooks.length > 0
                ? guidebooks.map((o, i) => <AntTab key={i} label={t(o.name)} {...a11yProps(i)} />)
                : ''}
            </AntTabs>
            {guidebooks.length > 0
              ? guidebooks.map((o, i) => (
                  <TabPanel value={value} index={i}>
                    <ItemAroundList guidebook_category_id={o.id} />
                  </TabPanel>
                ))
              : ''}
          </Grid>
        </Fragment>
      ) : (
        ''
      )}
    </Grid>
  );
};

export default PlacesAroundList;
