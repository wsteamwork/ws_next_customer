import React, { FC, Fragment, useEffect, useContext } from 'react';
import {
  createStyles,
  Grid,
  Theme,
  AppBar,
  Tabs,
  withStyles,
  Tab,
  Box,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import CardWrapperItem from '@/components/LTR/Merchant/Listing/UpdateListing/CardWrapperItem';
import ListingDetails from '@/components/LTR/Merchant/Listing/UpdateListing/ListingDetails';
import { useSelector, useDispatch } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import {
  getListingDetails,
  ListingDetailsReducerAction
} from '@/store/Redux/Reducers/LTR/UpdateListing/listingdetails';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { Dispatch } from 'redux';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import ListingPrice from '@/components/LTR/Merchant/Listing/UpdateListing/ListingPrice';
import ListingImage from '@/components/LTR/Merchant/Listing/UpdateListing/ListingImage';
interface IProps {
  classes?: any;
}
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
    borderBottom: '1px solid #e8e8e8'
  },
  indicator: {
    backgroundColor: '#1890ff'
  }
})(Tabs);

const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      minWidth: 72,
      padding: 0,
      fontWeight: theme.typography.fontWeightBold,
      marginRight: theme.spacing(6),
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(','),
      fontSize: 16,
      '&:hover': {
        color: '#40a9ff',
        opacity: 1
      },
      '&$selected': {
        color: '#1890ff',
        fontWeight: theme.typography.fontWeightBold
      },
      '&:focus': {
        color: '#40a9ff'
      }
    },
    selected: {
      color: '#1890ff'
    }
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}>
      <Box p={0} mt={3}>
        {children}
      </Box>
    </Typography>
  );
};

const a11yProps = (index: any) => {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`
  };
};
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    marginLabel: {
      margin: '24px 0'
    },
    wrapperTab: {
      boxShadow: 'none'
    }
  })
);

const UpdateListing: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const [value, setValue] = React.useState(0);
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const dispatch = useDispatch<Dispatch<ListingDetailsReducerAction>>();
  const listing = useSelector<ReducersList, LTRoomIndexRes>(
    (state) => state.listingdetails.listing
  );
  useEffect(() => {
    if (!listing) {
      getListingDetails(id, dispatch);
    }
  }, []);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Fragment>
      <Grid container justify="center" alignContent="center">
        <Grid item xs={11} sm={10} md={8} lg={6} className={classes.marginLabel}>
          <Grid className={classes.root}>
            <AppBar position="static" color="inherit" className={classes.wrapperTab}>
              <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                <AntTab label="Chi tiết phòng" />
                <AntTab label="Ảnh phòng" />
                <AntTab label="Giá phòng" />
                <AntTab label="Chế độ đặt phòng" />
                <AntTab label="Lịch trống phòng" />
              </AntTabs>
              <Typography className={classes.padding} />
            </AppBar>
            <TabPanel value={value} index={0}>
              <ListingDetails />
            </TabPanel>
            <TabPanel value={value} index={1}>
            <ListingImage />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <ListingPrice />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <CardWrapperItem title="Tên và mô tả" />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <CardWrapperItem title="Tên và mô tả" />
            </TabPanel>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};
export default UpdateListing;
