import Grid from '@material-ui/core/Grid/Grid';
import React, { FC, Fragment, useState, useEffect, useContext } from 'react';
import { makeStyles, Theme, createStyles, Typography } from '@material-ui/core';
import GuideBookItem from '@/components/GuideBookItem';
import DialogGuideBookMap from '@/components/GuideBookItem/DialogGuideBookMap';
import {
  UpdateDetailsActions,
  UpdateDetailsState,
  getDataPlacesListing,
  getGuideBookList
} from '@/store/Redux/Reducers/LTR/UpdateListing/updateDetails';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { GlobalContext } from '@/store/Context/GlobalContext';
import GuideBookPlacesList from '@/components/GuideBookPlacesList';
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 64
    },
    boxLeft: {
      marginBottom: 100,
      [theme.breakpoints.up('md')]: {
        display: 'flex'
      },
      [theme.breakpoints.down('sm')]: {
        marginBottom: 20
      }
    },
    marginTop: {
      marginTop: 32
    },
    alignCenter: {
      textAlign: 'center'
    }
  })
);
interface IProps {
  classes?: any;
}

const UpdateGuideBook: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const [openDialogMap, setOpenDialogMap] = useState(false);
  const [currentGuide, setcurrentGuide] = useState<number>(0);
  const [clearAddress, setClearAddress] = useState<boolean>(false);
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const { room_id, guidebooks } = useSelector<ReducersList, UpdateDetailsState>(
    (state) => state.updateDetails
  );
  const iconUrls = [
    'park.svg',
    'drinks.svg',
    'food.svg',
    'shopping.svg',
    'entertainment.svg',
    'bus.svg'
  ];
  const dispatch = useDispatch<Dispatch<UpdateDetailsActions>>();
  useEffect(() => {
    getDataPlacesListing(id, dispatch);
  }, [room_id]);
  useEffect(() => {
    getGuideBookList(dispatch);
  }, []);
  const handleOpenMap = (i: number) => {
    if (currentGuide !== i) {
      setClearAddress(true);
      setcurrentGuide(i);
    } else {
      setClearAddress(false);
    }
    setOpenDialogMap(true);
  };
  return (
    <Fragment>
      <Grid container>
        <Grid item md={12} className={classes.boxLeft}>
          <Grid item xs={12} sm={12} md={6}>
            <Grid item xs={12} md={11} className={classes.wrapper}>
              <Grid item xs={12} sm={11} md={11} className={classes.alignCenter}>
                <Typography variant="h1" gutterBottom className="label main_label">
                  Thêm đề xuất địa điểm hoặc chỉnh sửa những địa điểm hiện có
                </Typography>
                <Typography variant="h6" className="normal_text">
                  Khách du lịch quan tâm đến những địa điểm này đấy.
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={11} md={11} className={classes.wrapper}>
              <Grid container item xs={12} sm={10} md={11} lg={10} className={classes.boxLeft}>
                {guidebooks.length > 0
                  ? guidebooks.map((o, i) => (
                      <Grid key={i} item xs={4} className={i > 2 ? classes.marginTop : ''}>
                        <GuideBookItem
                          handleOpenDialogMap={() => handleOpenMap(o.id)}
                          iconUrl={`/static/guidebook/${iconUrls[i]}`}
                          text={o.name}
                          selected={currentGuide === o.id}
                        />
                      </Grid>
                    ))
                  : ''}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={6} className={classes.wrapper}>
            <Grid item xs={11} sm={8} md={8}>
              <GuideBookPlacesList />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <DialogGuideBookMap
        clearAddress={clearAddress}
        guidebook_category_id={currentGuide}
        open={openDialogMap}
        handleClose={() => setOpenDialogMap(false)}
      />
    </Fragment>
  );
};

export default UpdateGuideBook;
