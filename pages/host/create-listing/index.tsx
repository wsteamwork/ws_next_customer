import React, { Fragment, FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import CreateOriginalListing from '@/components/Layout/CreateOriginalListing';
import ChooseTypeAccommodation
  from '@/components/LTR/Merchant/Listing/CreateListing/OriginalListing/ChooseTypeAccommodation';

interface IProps {
  classes?: any
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({

  })
);

const CreateListing: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {} = props;

  return (
    <Fragment>
      <CreateOriginalListing>
        <ChooseTypeAccommodation/>
      </CreateOriginalListing>
    </Fragment>
  );
};

export default CreateListing;
