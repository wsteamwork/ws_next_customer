import { placeNearTypeList } from '@/utils/mixins';
import { Grid, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, withStyles } from '@material-ui/styles';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ItemAroundList from './ItemAroundList';

interface IProps {
  classes?: any;
  latitude?: string;
  longitude?: string;
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
}
function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

const PlacesAroundList: FC<IProps> = (props) => {
  const { latitude, longitude } = props;
  const classes = useStyles(props);
  const { t } = useTranslation();
  const [value, setValue] = useState(0);
  const [nearby, setNearby] = useState([]);
  const your_app_id = 'nfVrIaYJrNrOsBPg8An7';
  const your_app_code = '54vN9paKcbDlrQ_E4R4jqw';
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const fetchData = async () => {
    let newData = [];
    for (let i = 0; i < placeNearTypeList.length; i++) {
      let item = placeNearTypeList[i];
      await axios
        .get(`https://places.cit.api.here.com/places/v1/discover/around`, {
          params: {
            app_id: your_app_id,
            app_code: your_app_code,
            at: `${parseFloat(latitude)},${parseFloat(longitude)}`,
            cat_id: item.name,
            pretty: true,
            size: item.size
          }
        })
        .then((res) => {
          newData = [...newData, res.data.results.items];
          setNearby(newData)
        })
        .catch((err) => console.error(err));
    }
    // dispatch({ type: 'setDataPlaces', payload: newData });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid>
      <Typography variant="h5" className={classes.title}>
        {t('room:nearbyPlaces')}
      </Typography>
      {latitude && longitude ? (
        <Grid className={classes.rootTab}>
          <AntTabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}>
            <AntTab label={t('room:neutralGeographic')} {...a11yProps(0)} />
            <AntTab label={t('room:restaurant')} {...a11yProps(1)} />
            <AntTab label={t('room:shopping')} {...a11yProps(2)} />
            <AntTab label={t('room:entertainment')} {...a11yProps(3)} />
            <AntTab label={t('room:medical')} {...a11yProps(4)} />
            <AntTab label={t('room:building')} {...a11yProps(5)} />
          </AntTabs>
          <TabPanel value={value} index={0}>
            <ItemAroundList itemList={nearby[0]} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ItemAroundList itemList={nearby[1]} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ItemAroundList itemList={nearby[2]} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ItemAroundList itemList={nearby[3]} />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <ItemAroundList itemList={nearby[4]} />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <ItemAroundList itemList={nearby[5]} />
          </TabPanel>
        </Grid>
      ) : (
          ''
        )}
    </Grid>
  );
};

export default PlacesAroundList;
