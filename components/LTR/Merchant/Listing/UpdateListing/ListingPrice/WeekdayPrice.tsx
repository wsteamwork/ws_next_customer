import { ReducersList } from '@/store/Redux/Reducers';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { FC, Fragment, useContext } from 'react';
import { useSelector } from 'react-redux';
import CardWrapperItem from '../CardWrapperItem';
import { GlobalContext } from '@/store/Context/GlobalContext';
interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
  
  })
);

const WeekdayPrice: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const listing = useSelector<ReducersList, any>((state) => state.listingdetails.listing);
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const openUpdate = () => {
    router.push(`/host/update-listing/${id}/weekday`);
  };
  return (
    <Fragment>
      {!!listing ? (
        <CardWrapperItem title="Giá cuối tuần" onClick={openUpdate}>
        </CardWrapperItem>
      ) : (
          ''
        )}
    </Fragment>
  );
};
export default WeekdayPrice;
