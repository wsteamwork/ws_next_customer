import { ReducersList } from '@/store/Redux/Reducers';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import React, { FC, Fragment, useContext } from 'react';
import { useSelector } from 'react-redux';
import CardWrapperItem from '../CardWrapperItem';
import { GlobalContext } from '@/store/Context/GlobalContext';

interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    name: {
      fontWeight: theme.typography.fontWeightBold,
      color: '#484848'
    }
  })
);

const CoverPhoto: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const listing = useSelector<ReducersList, any>((state) => state.listingdetails.listing);
  const openUpdate = () => {
    router.push(`/host/update-listing/${id}/cover-photo`);
  };
  return (
    <Fragment>
      {!!listing ? (
        <CardWrapperItem title="Ảnh bìa" onClick={openUpdate}>
          <Grid item xs={12} className={classes.nameIcon}>
            Số ảnh: <span className={classes.name}>{listing.cover_photo.images.length}</span>
            {listing.cover_photo.images.length == 0 ?
              <div>
                <br />
                <span className={classes.name}>Vui lòng cập nhật thêm ảnh</span>
              </div>
              : ''
            }
          </Grid>
        </CardWrapperItem>
      ) : (
          ''
        )}
    </Fragment>
  );
};
export default CoverPhoto;
