import React, { FC, Fragment } from 'react';
import { createStyles, Theme} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import NavHeader_Merchant from '@/components/LTR/ReusableComponents/NavHeader_Merchant';
import BathRooms from '@/components/LTR/Merchant/Listing/UpdateListing/UpdateComponentDetails/UpdateBathRooms';
interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    marginLabel: {
      margin: '24px 0'
    },
  })
);

const UpdateBathRooms: FC<IProps> = (props) => {
  const classes = useStyles(props);
  return (
    <Fragment>
      <NavHeader_Merchant />
      <BathRooms />
    </Fragment>
  );
};
export default UpdateBathRooms;
