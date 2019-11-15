import { faMapSigns } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Theme, Grid } from '@material-ui/core';
import { createStyles, makeStyles, withStyles } from '@material-ui/styles';
import React, { FC, useState, useEffect, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ItemAroundList from './ItemAroundList';
import { RoomDetailsContext } from '@/store/Context/Room/RoomDetailContext';
interface IProps {
  classes?: any;
  district?: string;
  city?: string;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    title: {
      fontWeight: 700,
      marginTop: theme.spacing(4),
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
      fontSize: 16,
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

function TabPanel(props: TabPanelProps) {
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
  const { t } = useTranslation();
  const { state } = useContext(RoomDetailsContext);
  const { places } = state;
  const classes = useStyles(props);
  const { district, city } = props;
  const [value, setValue] = useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Grid>
      <Typography variant="h5" className={classes.title}>
        Xung quanh căn hộ
      </Typography>

      <Typography variant="subtitle1" className={classes.txtAddress}>
        <FontAwesomeIcon className={classes.icon} icon={faMapSigns} />
        {district}, {city}
      </Typography>
      {places ? (
        <Grid className={classes.rootTab}>
          <AntTabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}>
            <AntTab label="Địa điểm nổi tiếng" {...a11yProps(0)} />
            <AntTab label="Ẩm thực" {...a11yProps(1)} />
            <AntTab label="Mua sắm" {...a11yProps(2)} />
            <AntTab label="Giải trí" {...a11yProps(3)} />
            <AntTab label="Y tế" {...a11yProps(4)} />
            <AntTab label="Tòa nhà xung quanh" {...a11yProps(5)} />
          </AntTabs>
          <TabPanel value={value} index={0}>
            <ItemAroundList itemList={places[0]} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ItemAroundList itemList={places[1]} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ItemAroundList itemList={places[2]} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ItemAroundList itemList={places[3]} />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <ItemAroundList itemList={places[4]} />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <ItemAroundList itemList={places[5]} />
          </TabPanel>
        </Grid>
      ) : (
        ''
      )}
    </Grid>
  );
};

export default PlacesAroundList;
