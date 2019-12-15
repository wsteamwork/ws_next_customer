import React, { Fragment, FC } from 'react';
import CreateOriginalListing from '@/components/Layout/CreateOriginalListing';
import ChooseTypeAccommodation
  from '@/components/LTR/Merchant/Listing/CreateListing/OriginalListing/ChooseTypeAccommodation';

interface IProps {
  classes?: any
}

const CreateListing: FC<IProps> = (props) => {
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
