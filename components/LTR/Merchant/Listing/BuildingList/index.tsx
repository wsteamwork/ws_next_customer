import React, { FC, Fragment, useState, useEffect, useContext } from 'react';
import 'swiper/swiper.scss';
import { Grid, makeStyles, Theme, createStyles, Box, Typography, Button } from '@material-ui/core';
// import 'react-id-swiper/lib/styles/scss/swiper.scss';
import { useTranslation } from 'react-i18next';
import { ApartmentBuildingsRes } from '@/types/Requests/LTR/CreateListing/ApartmentBuildings/ApartmentBuildingsRes';
import { axios_merchant } from '@/utils/axiosInstance';
import GridContainer from '@/components/Layout/Grid/Container';
import { IMAGE_STORAGE_SM } from '@/utils/store/global';
import DialogInfoBuildingAndAddRooms from '@/components/LTR/Merchant/Listing/BuildingList/DialogInfoBuildingAndAddRooms';
import { GlobalContext } from '@/store/Context/GlobalContext';

interface IProps { }

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    imgBuilding: {
      width: '100%',
      borderRadius: 8
    },
    button: {
      width: 79.58,
      boxShadow: 'none',
      marginTop: 5,
      color: '#ffffff',
      textTransform: 'initial',
      backgroundColor: '#1d8df7',
      '&:hover': {
        color: '#ffffff',
        textTransform: 'initial',
        backgroundColor: '#1d8df7'
      }
    },
  })
);
const BuildingListHost: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const [buildings, setBuildings] = useState<ApartmentBuildingsRes[]>([]);
  const [openDialog, setOpenDialog] = useState<number>(0);
  const { router } = useContext(GlobalContext);
  const getBuildings = async () => {
    try {
      const res = await axios_merchant.get(`apartment-buildings`);
      return res.data;
    } catch (error) { }
  };

  useEffect(() => {
    getBuildings().then((res) => {
      setBuildings(res.data);
    });
  }, []);
  const openUpdate = (id) => {
    router.push(`/host/create-listing/${id}/apartment`)
  };

  return (
    <Fragment>
      <GridContainer xs={11} sm={11} md={10} lg={8}>
        <Box mt={3}>
          <Typography variant="h5" align="center">
            {t('roomlist:titleNameBuilding')}
          </Typography>
        </Box>
        {buildings ? (
          <Box my={8}>
            <Grid container spacing={2}>
              {buildings.map((o, i) => (
                <Fragment key={i}>
                  <Grid item xs={3}>
                    <Box onClick={() => setOpenDialog(o.id)} style={{ cursor: 'pointer' }}>
                      <img
                        src={
                          o.avatar
                            ? `${IMAGE_STORAGE_SM + o.avatar}`
                            : '/static/images/building_demo.jpg'
                        }
                        alt={o.name}
                        className={classes.imgBuilding}
                      />
                      <Typography variant="subtitle2">{o.name}</Typography>
                      <Button
                        onClick={() => openUpdate(o.id)}
                        className={classes.button}
                        color="primary"
                        autoFocus>
                        Cập nhật
                      </Button>
                    </Box>
                  </Grid>
                  <DialogInfoBuildingAndAddRooms
                    open={openDialog}
                    handleClose={() => setOpenDialog(o.id)}
                    buildingID={o.id}
                    name={o.name}
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
