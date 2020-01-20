import { LTRoomIndexRes } from "@/types/Requests/LTR/LTRoom/LTRoom";
import { formatMoney } from "@/utils/mixins";
import { Grid, MenuItem, OutlinedInput, Select, Theme, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import { FC, Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import ButtonGlobal from "../ButtonGlobal";
import { IMAGE_STORAGE_SM } from "@/utils/store/global";

interface IProps {
  room: LTRoomIndexRes;
};

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    componentContainer: {
      borderWidth: 4,
      // padding: 36,
      borderColor: 'red',
      backgroundColor: '#7676762d',
      height: 300,
      width: '100%'
    },
    menuSelect: {
      backgroundColor: 'white',
      // height: 100
    },
    selectContainer: {
      backgroundColor: 'white',
      height: 40,
      width: 80,
      padding: 8
    },
    infoContainer: {
      padding: 8
    },
    badgeVerified: {
      width: 20,
      height: 20,
      marginRight: 8
    }
  })
);

const AgodaRoomCard: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { room } = props;
  const { t } = useTranslation();
  const [numberOfRoom, setNumberOfRoom] = useState(0);
  return (
    <Fragment>
      <Grid container className={classes.componentContainer}>
        {/* Images and Info */}
        <Grid item style={{ flex: 2.4, paddingTop: 8, border: 'solid', borderWidth: 1, borderColor: '#dcdcdc' }}>
          <Grid item container xs={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', backgroundColor: 'white' }}>
            <Grid item xs={12}>
              <img src={`${IMAGE_STORAGE_SM}${room.avatar.images[0].name}`} height={126} width={'100%'} />
            </Grid>
            <Grid item xs={12} style={{ marginTop: -4, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Grid item xs={12}>
                <img src={`${IMAGE_STORAGE_SM}${room.avatar.images[0].name}`} height={63} width={'100%'} />
              </Grid>
              <Grid item xs={12} style={{ paddingLeft: 1 }}>
                <img src={`${IMAGE_STORAGE_SM}${room.avatar.images[0].name}`} height={63} width={'100%'} />
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <Typography style={{ fontSize: 11, color: '#5392f9' }}>Room photos and details</Typography>
          </Grid>
          <Grid>
            1 single bed and 1 king bed or 2 double beds
          </Grid>
          <Grid>
            1 single bed and 1 king bed or 2 double beds
          </Grid>
          <Grid>
            1 single bed and 1 king bed or 2 double beds
          </Grid>
          <Grid>
            1 single bed and 1 king bed or 2 double beds
          </Grid>
        </Grid>
        {/* Service price */}
        <Grid item style={{ flex: 3.6, border: 'solid', borderWidth: 1, borderColor: '#dcdcdc' }}>
          <Grid item container>
            <Grid item className={classes.infoContainer}>
              <Typography variant={'body1'} style={{ fontWeight: 700 }}>
                Your price includes:
              </Typography>
              {room.prices.included_fee.map((o, i) => {
                if (o.included == 1) {
                  return (
                    <div key={i} style={{ paddingTop: 4, paddingBottom: 2 }}>
                      <div style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', display: 'flex' }}>
                        <img src={'/static/images/verified.svg'} alt='Included' className={classes.badgeVerified} />
                        <div>{o.name}</div>
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div key={i} style={{ paddingTop: 4, paddingBottom: 2 }}>
                      <div style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', display: 'flex' }}>
                        <img src={'/static/images/close.svg'} alt='Not Included' className={classes.badgeVerified} />
                        <div style={{ paddingRight: 12 }}>
                          {o.name} |
                        </div>
                        <div>{o.calculate_function == 3 || o.calculate_function == 6 ? `${o.calculate_function_txt}` : `${formatMoney(o.value)} ${o.calculate_function_txt}`}</div>
                      </div>

                    </div>
                  )
                }
              })}
            </Grid>
          </Grid>
        </Grid>
        {/* Guests */}
        <Grid item style={{ flex: 0.96, paddingTop: 8, border: 'solid', borderWidth: 1, borderColor: '#dcdcdc' }}>

        </Grid>
        {/* Price */}
        <Grid item style={{ flex: 2.16, paddingTop: 8, border: 'solid', borderWidth: 1, borderColor: '#dcdcdc' }}>
          <Grid style={{ background: 'tomato', height: 25, width: 110, borderTopRightRadius: 2, borderBottomRightRadius: 2, color: 'white' }}>
            <Typography variant="body2" style={{ alignSelf: 'flex-end', paddingLeft: 3, paddingBottom: 4 }}>
              {t('longtermroom:pricePerMonth')}
            </Typography>
          </Grid>
          <Grid style={{ paddingBottom: 0, paddingRight: 4, paddingTop: 12, flexDirection: 'row', justifyContent: 'flex-end', display: 'flex', color: '#f54a2b' }}>
            <Typography variant="body2" style={{ alignSelf: 'flex-end', paddingBottom: 4, paddingRight: 2 }}>
              {t('longtermroom:currency')}
            </Typography>
            <Typography variant="h6" style={{ fontWeight: 600, alignSelf: 'flex-end' }}>
              {room.price_display}
            </Typography>
          </Grid>
          <Grid style={{ display: 'flex', justifyContent: 'flex-end', color: '#767676' }}>
            <Typography style={{ alignSelf: 'flex-end', paddingRight: 3, fontSize: 11, paddingBottom: 4 }}>
              {'Price per night as low as'}
            </Typography>
          </Grid>
        </Grid>

        {/* Rooms */}
        <Grid item style={{ flex: 0.96, border: 'solid', borderWidth: 1, borderColor: '#dcdcdc' }}>
          <Grid style={{ padding: 12, display: 'flex', flexDirection: 'column' }} justify="center" alignItems="center">

            <Grid>
              <Select
                className={classes.selectContainer}
                fullWidth
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setNumberOfRoom(parseInt(event.target.value)) }}
                value={numberOfRoom}
                inputProps={{ style: { padding: 12 } }}
                input={<OutlinedInput labelWidth={0} />}
                MenuProps={{
                  classes: { paper: classes.menuSelect }
                }}
              >
                <MenuItem value={0}>
                  0
                </MenuItem>
                <MenuItem value={1}>
                  1
                </MenuItem>
                <MenuItem value={2}>
                  2
                </MenuItem>
                <MenuItem value={3}>
                  3
                </MenuItem>
              </Select>

            </Grid>
          </Grid>
        </Grid>
        {/* Booking reservation */}
        <Grid item container style={{ flex: 1.92, border: 'solid', borderWidth: 1, borderColor: '#dcdcdc' }}>
          <Grid item xs={12} style={{ padding: 12 }}>
            <ButtonGlobal padding="0px" width="100%" height={40}>
              Reserve
            </ButtonGlobal>
          </Grid>
        </Grid>
      </Grid>
    </Fragment >
  )
}
export default AgodaRoomCard;