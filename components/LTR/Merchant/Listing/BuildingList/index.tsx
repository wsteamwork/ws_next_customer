import React, { FC, Fragment, useState, useEffect, useContext } from 'react';
import 'swiper/swiper.scss';
import {
  Grid,
  makeStyles,
  Theme,
  createStyles,
  Box,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent, CardActions, IconButton, Tooltip
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ApartmentBuildingsRes } from '@/types/Requests/LTR/CreateListing/ApartmentBuildings/ApartmentBuildingsRes';
import { axios_merchant } from '@/utils/axiosInstance';
import GridContainer from '@/components/Layout/Grid/Container';
import { IMAGE_STORAGE_SM } from '@/utils/store/global';
import DialogInfoBuildingAndAddRooms
  from '@/components/LTR/Merchant/Listing/BuildingList/DialogInfoBuildingAndAddRooms';
import { GlobalContext } from '@/store/Context/GlobalContext';
import CreateIcon from '@material-ui/icons/CreateRounded';
import AssignmentIcon from '@material-ui/icons/AssignmentRounded';

interface IProps {
}

const useStyles                    = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    imgBuilding: {
      width: '100%',
      borderRadius: 8
    },
    card: {
      maxWidth: 345,
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
    },
    media: {
      height: 0,
      paddingTop: '56.25%' // 16:9
    },
    txtRoomName: {
      overflowWrap: 'break-word',
      color: '#484848',
      lineHeight: '24px',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      textOverflow: 'ellipsis',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    },
    txtSubName: {
      overflowWrap: 'break-word',
      color: 'rgba(0, 0, 0, 0.54)',
      display: '-webkit-box',
      WebkitLineClamp: 1,
      textOverflow: 'ellipsis',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    },
    txtAddress: {
      overflowWrap: 'break-word',
      color: 'rgba(0, 0, 0, 0.54)',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      textOverflow: 'ellipsis',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      minHeight: 40
    }
  })
);
const BuildingListHost: FC<IProps> = (props) => {
  const classes                     = useStyles(props);
  const { t }                       = useTranslation();
  const [buildings, setBuildings]   = useState<ApartmentBuildingsRes[]>([]);
  const [openDialog, setOpenDialog] = useState<number>(0);
  const { router }                  = useContext(GlobalContext);
  const getBuildings                = async () => {
    try {
      const res = await axios_merchant.get(`apartment-buildings`);
      return res.data;
    } catch (error) {
    }
  };

  useEffect(() => {
    getBuildings().then((res) => {
      setBuildings(res.data);
    });
  }, []);
  const openUpdate = (id) => {
    router.push(`/host/create-listing/${id}/apartment`);
  };

  return (
    <Fragment>
      <GridContainer xs = {11} sm = {11} md = {10} lg = {8}>
        <Box mt = {3}>
          <Typography variant = 'h5' align = 'center'>
            {t('roomlist:titleNameBuilding')}
          </Typography>
        </Box>
        {buildings ? (
          <Box my = {8}>
            <Grid container spacing = {2}>
              {buildings.map((o, i) => (
                <Fragment key = {i}>
                  <Grid item xs = {3}>
                    <Card className = {classes.card}>
                      <CardHeader
                        title = {o.name}
                        subheader = {o.updated_at}
                        classes = {{
                          title: classes.txtRoomName,
                          subheader: classes.txtSubName
                        }}
                        titleTypographyProps = {{
                          variant: 'h6',
                          gutterBottom: true
                        }}
                      />
                      <CardMedia
                        className = {classes.media}
                        image = {o.avatar ? `${IMAGE_STORAGE_SM + o.avatar}` : '/static/images/building_demo.jpg'}
                        title = {o.name}
                      />
                      <CardContent>
                        <Typography variant = 'body2' component = 'p' className = {classes.txtAddress}>
                          {o.address}
                        </Typography>
                      </CardContent>
                      <CardActions disableSpacing>
                        <Tooltip title = 'Setting'>
                          <IconButton aria-label = 'Management building'>
                            <AssignmentIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title = 'Edit building'>
                          <IconButton aria-label = 'Edit-building' onClick={()=>openUpdate(o.id)}>
                            <CreateIcon />
                          </IconButton>
                        </Tooltip>
                      </CardActions>
                    </Card>
                  </Grid>
                  <DialogInfoBuildingAndAddRooms
                    open = {openDialog}
                    handleClose = {() => setOpenDialog(0)}
                    buildingID = {o.id}
                    name = {o.name}
                  />
                </Fragment>
              ))}
            </Grid>
          </Box>
        ) : (
          <Box>chua co phong nao</Box>
        )}
      </GridContainer>
    </Fragment>
  );
};

export default BuildingListHost;
