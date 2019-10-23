import React, { FC, Fragment } from 'react';
import { createStyles, Theme} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import NavHeader_Merchant from '@/components/LTR/ReusableComponents/NavHeader_Merchant';
import NumberGuest from '@/components/LTR/Merchant/Listing/UpdateListing/UpdateComponentDetails/UpdateNumberGuest';
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

const UpdateNumberGuest: FC<IProps> = (props) => {
  const classes = useStyles(props);
  return (
    <Fragment>
      <NavHeader_Merchant />
      <NumberGuest />
    </Fragment>
  );
};
export default UpdateNumberGuest;
