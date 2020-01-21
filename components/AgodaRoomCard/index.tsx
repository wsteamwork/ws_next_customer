import { LTRoomIndexRes } from "@/types/Requests/LTR/LTRoom/LTRoom";
import { formatMoney } from "@/utils/mixins";
import { IMAGE_STORAGE_SM } from "@/utils/store/global";
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, MenuItem, OutlinedInput, Select, Theme, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import { FC, Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ButtonGlobal from "../ButtonGlobal";
interface IProps {
  room: LTRoomIndexRes;
};

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 8,
      border: '0.5px solid rgba(220, 220, 220, 0.686)',
      height: 45,
      backgroundColor: 'white'
    },
    componentContainer: {
      borderWidth: 4,
      // padding: 36,
      borderColor: 'red',
      backgroundColor: 'white',
      // height: 300,
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
  const [wifiFree, setWifiFree] = useState(null);
  const [noSmoking, setNoSmoking] = useState(null);
  const _filterFacilities = () => {
    room.comforts.facilities.filter(item => {
      if (item.id === 9) {
        setWifiFree(item);
      }
    })
  }
  const _filterSmoking = () => {
    room.comforts.others.filter(item => {
      if (item.id === 87) {
        setNoSmoking(item);
      }
    })
  }

  useEffect(() => {
    _filterFacilities()
    _filterSmoking()
  }, [room])

  return (
    <Fragment>
      <Grid>
        <Grid container className={classes.titleContainer}>
          <Typography variant={'h6'} style={{ fontWeight: 700 }}>
            {room.about_room.name}
          </Typography>
        </Grid>
        <Grid container className={classes.componentContainer}>
          {/* Images and Info */}
          <Grid item xs={12} style={{ flex: 2.6, border: 'solid', borderWidth: 0.5, borderColor: '#dcdcdcaf', display: 'flex', justifyContent: 'center' }}>
            <Grid xs={12} lg={11}>
              <Grid item container xs={12} justify={'center'} style={{ display: 'flex', justifyContent: 'center', paddingBottom: 4 }}>
                <Grid item xs={12} lg={12}>
                  <img src={`${IMAGE_STORAGE_SM}${room.avatar.images[0].name}`} height={126} width={'100%'} />
                </Grid>
                {/* <Grid item xs={12} lg={12} style={{ marginTop: -4, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Grid item xs={12}>
                    <img src={`${IMAGE_STORAGE_SM}${room.avatar.images[0].name}`} height={63} width={'100%'} />
                  </Grid>
                  <Grid item xs={12} style={{ paddingLeft: 1 }}>
                    <img src={`${IMAGE_STORAGE_SM}${room.avatar.images[0].name}`} height={63} width={'100%'} />
                  </Grid>
                </Grid> */}
              </Grid>
              <Grid item xs={12} style={{ padding: 4 }}>
                <Grid style={{ paddingBottom: 8 }}>
                  <Typography style={{ fontSize: 11, color: '#5392f9' }}>Room photos and details</Typography>
                </Grid>
                <Grid style={{ paddingBottom: 8 }}>
                  {wifiFree ?
                    (
                      <Grid style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', display: 'flex' }}>
                        <img src={`${wifiFree.icon}`} height={20} width={20} />
                        <Typography variant={'body2'} style={{ paddingLeft: 12 }}>{wifiFree.comfort_trans[0].name}</Typography>
                      </Grid>
                    )
                    : (null)
                  }
                </Grid>
                <Grid style={{ paddingBottom: 8 }}>
                  <Grid style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', display: 'flex' }}>
                    <img src={'/static/icons/bedroom.svg'} width={20} height={20} />
                    <Typography variant={'body2'} style={{ paddingLeft: 12 }}>{room.bedrooms.number_bedroom} phòng ngủ</Typography>
                  </Grid>
                </Grid>
                <Grid style={{ paddingBottom: 8 }}>
                  <Grid style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', display: 'flex' }}>
                    <img src={'/static/icons/area.svg'} width={20} height={20} />
                    <Typography variant={'body2'} style={{ paddingLeft: 12 }}>Room size: {room.total_area} m<sup>2</sup></Typography>
                  </Grid>
                </Grid>
                <Grid style={{ paddingBottom: 8 }}>
                  {noSmoking ?
                    (
                      <Grid style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', display: 'flex' }}>
                        <img src={`${noSmoking.icon}`} height={20} width={20} />
                        <Typography variant={'body2'} style={{ paddingLeft: 12 }}>{noSmoking.comfort_trans[0].name}</Typography>
                      </Grid>
                    )
                    : (null)
                  }
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* Service price */}
          <Grid item style={{ flex: 3.4, border: 'solid', borderWidth: 0.5, borderColor: '#dcdcdcaf' }}>
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
          <Grid item container style={{ flex: 1.12, paddingTop: 8, border: 'solid', borderWidth: 0.5, borderColor: '#dcdcdcaf' }}>
            <Grid style={{ flexDirection: 'column' }} xs={12}>
              <Grid item xs={12} sm={12} style={{ justifyContent: 'center', display: 'flex' }}>
                <FontAwesomeIcon icon={faUserFriends} size={'lg'} />
              </Grid>
              <Grid className={classes.nameIcon} item xs={12} sm={12} style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center' }}>
                <Grid>
                  <Typography variant={'body2'}>
                    {room.guests.recommendation + room.guests.max_additional_guest}
                  </Typography>
                </Grid>
                <Grid style={{ paddingLeft: 4 }}>
                  <Typography variant={'body2'}>
                    {t('rooms:guests')}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* Price */}
          <Grid item style={{ flex: 2, paddingTop: 8, border: 'solid', borderWidth: 0.5, borderColor: '#dcdcdcaf' }}>
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
          <Grid item style={{ flex: 0.96, border: 'solid', borderWidth: 0.5, borderColor: '#dcdcdcaf' }}>
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
          <Grid item container style={{ flex: 1.92, border: 'solid', borderWidth: 0.5, borderColor: '#dcdcdcaf' }}>
            <Grid item xs={12} style={{ padding: 12 }}>
              <ButtonGlobal padding="0px" width="100%" height={40}>
                Reserve
            </ButtonGlobal>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment >
  )
}
export default AgodaRoomCard;