import React, { useContext, memo, FC } from 'react';
import { Grid } from '@material-ui/core';
import ButtonGlobal from '@/components/ButtonGlobal';
import { RoomDetailsContext } from '@/store/Context/Room/RoomDetailContext';
import { OfflineBoltRounded } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

const SubmitBooking: FC = () => {
  const { state } = useContext(RoomDetailsContext);
  const { error } = state;
  const { t } = useTranslation();

  return (
    <Grid className="boxBooking__buttonSubmit">
      <ButtonGlobal disabled={!!error} padding="0px" width="100%">
        <p className="flex_center">
          <OfflineBoltRounded></OfflineBoltRounded>&nbsp;&nbsp;{t('room:boxBooking:bookNow')}
        </p>
      </ButtonGlobal>
    </Grid>
  );
};

export default memo(SubmitBooking);
