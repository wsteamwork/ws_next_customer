import React, { Fragment,FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, AppBar, Typography } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import GridContainer from '@/components/Layout/Grid/Container';
import Grid from '@material-ui/core/Grid';
import numeral from "numeral";
import ButtonGlobal from '@/components/ButtonGlobal';
import { useTranslation } from 'react-i18next';

interface IProps {
  classes?: any,
  priceBasic: number,
  term:string
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({

  })
);

const BoxBottomBooking: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {priceBasic, term} = props;
  const { t } = useTranslation();

  return (
      <Grid className="navBottomBook">
        <AppBar position="fixed" color="inherit" className="barSearch">
          <Toolbar className="toolBar">
            <GridContainer xs={12} sm={12} md={11} lg={10}>
              <Grid container spacing={2} className={'container'}>
                <Grid item xs>
                  <Grid container>
                    <Grid item xs>
                      <div>
                        <Typography className={'price'}>
                          {numeral(priceBasic).format('0,0')} Vnd
                        </Typography>
                        <Typography variant='subtitle2'>
                          {term}
                        </Typography>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4} sm={3}>
                  <ButtonGlobal padding="0px" width="100%" onClick={()=>alert('tính năng hiện tại chưa hoàn thiện')} className='btBook'>
                    {t('room:boxBooking:bookNow')}
                  </ButtonGlobal>
                </Grid>
              </Grid>
            </GridContainer>
          </Toolbar>
        </AppBar>
      </Grid>
  );
};

export default BoxBottomBooking;
