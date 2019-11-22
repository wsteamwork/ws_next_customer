import ButtonGlobal from '@/components/ButtonGlobal';
import HostInfo from '@/components/HostInfo';
import { formatMoney } from '@/utils/mixins';
import { Divider, Grid, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
interface IProps {
  classes?: any;
  priceBasic: number | string;
  id: number;
  avatar: string;
  avatar_url: string;
  name: string;
  number_room: number;
  included_services?: Array<string>;
  not_included_services?: Array<string>;
  handleOpenBookingDialog?: any;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    boxContainer: {
      padding: 16,
      boxShadow: '0 3px 35px 0 rgba(132,135,138,.14)',
      position: 'sticky',
      top: '15%'
    },
    rowMargin: {
      margin: '16px 0'
    },
    notifyText: {
      color: '#484848'
    },
    textMarginBottom: {
      marginBottom: '32px'
    }
  })
);

const BoxBookingLT: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {
    id,
    avatar,
    avatar_url,
    name,
    number_room,
    priceBasic,
    handleOpenBookingDialog,
    included_services,
    not_included_services
  } = props;
  const { t } = useTranslation();
  return (
    <div className={classes.boxContainer}>
      <Typography variant="h6">{t('longtermroom:currency')}{formatMoney(priceBasic)}</Typography>
      <Typography className={classes.textMarginBottom} variant="subtitle2">{t('longtermroom:priceBasic')}</Typography>

      <div className={classes.rowMargin}>
        <ButtonGlobal height={50} background="linear-gradient(to right, #667eea, #764ba2);" padding="0px" width="100%" onClick={handleOpenBookingDialog}>
          <p className="flex_center" style={{ color: '#ffffff' }}>
            {/* <OfflineBoltRounded /> */}
            &nbsp;&nbsp;{t('longtermroom:viewSchedule')}
          </p>
        </ButtonGlobal>
      </div>

      <Grid container spacing={1} className={classes.rowMargin}>
        <Grid item xs={12}>
          <span className={classes.notifyText}>
            <img width="17" style={{ marginRight: '5px' }} src="/static/electronics.svg" />
            {t('longtermroom:depositFee')}
          </span>
        </Grid>
        {included_services.length ? (
          <Grid item xs={12}>
            <span className={classes.notifyText}>
              <img width="17" style={{ marginRight: '5px' }} src="/static/electronics.svg" />
              {t('longtermroom:priceIncludedFee')} : {
                included_services.map((value, index) => (
                  <span key={index}>{value}{included_services.length !== (index + 1) ? ', ' : ''} </span>
                ))
              }
            </span>
          </Grid>
        ) : ''}
        {not_included_services.length ? (
          <Grid item xs={12}>
            <span className={classes.notifyText}>
              <img width="17" style={{ marginRight: '5px' }} src="/static/electronics.svg" />
              {t('longtermroom:priceNotIncludedFee')} : {
                not_included_services.map((value, index) => (
                  <span key={index}>{value}{not_included_services.length !== (index + 1) ? ', ' : ''} </span>
                ))
              }
            </span>
          </Grid>
        ) : ''}
      </Grid>
      <Divider className={classes.rowMargin} />

      <HostInfo
        id={id}
        avatar={avatar}
        avatar_url={avatar_url}
        name={name}
        number_room={number_room}
        maxWidth="100%"
        border="none"
      />
    </div>
  );
};

export default BoxBookingLT;
