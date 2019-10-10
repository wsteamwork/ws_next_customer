import {
  createStyles,
  Divider,
  Grid,
  Link,
  Theme,
  Paper,
  IconButton,
  Hidden
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/styles';
import React, { FC, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faBed, faBath, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import LinearProgress from '@material-ui/core/LinearProgress';
interface IProps {
  classes?: any;
  room: any;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(3)
    },
    paper: {
      padding: '24px'
    },
    title: {
      fontWeight: 600
    },
    content: {
      height: '100%',
      flexDirection: 'column',
      display: 'flex',
      justifyContent: 'center'
    },
    img: {
      display: 'block',
      width: 140,
      objectFit: 'cover',
      border: '1px solid #efefef',
      borderRadius: '10px'
    },
    widthImg: {
      display: 'flex',
      [theme.breakpoints.down('xs')]: {
        marginBottom: 8
      },
      [theme.breakpoints.up('md')]: {
        maxWidth: 160
      }
    },
    roomName: {
      fontSize: '1.2rem',
      display: 'inline-block',
      color: '#48465b',
      fontWeight: 600,
      alignItems: 'center',
      marginRight: '0.5rem',
      [theme.breakpoints.down('md')]: {
        fontSize: '1rem'
      }
    },
    price: {
      display: 'flex',
      justifyContent: 'flex-start',
      margin: '5px 0'
    },
    priceDay: {
      fontSize: 14,
      [theme.breakpoints.down('sm')]: {
        fontSize: 13
      }
    },
    link: {
      color: '#484848'
    },
    infoRoomName: {
      display: 'flex',
      margin: '5px 0'
    },
    vertifiredMdDown: {
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('md')]: {
        alignItems: 'flex-start'
      }
    },
    iconVerified: {
      width: '23px',
      float: 'inherit',
      position: 'relative',
      top: 5,
      left: 5
    },
    spanIcon: {
      display: 'flex',
      alignItems: 'center'
    },
    marginLabel: {
      margin: '24px 0'
    },
    wrapperIcon: {
      maxWidth: 140
    },
    IconButton: {
      backgroundColor: '#E1E8F7',
      color: '#3E93F8',
      borderRadius: '50%',
      padding: 8,
      marginLeft: 8,
      '&:hover': {
        background: '#3E93F8',
        color: '#fff'
      }
    },
    customIcon: {
      color: '#767676'
    },
    maxWidthIcon: {
      maxWidth: 60
    },
    sizeButton: {
      [theme.breakpoints.down('md')]: {
        width: '0.9rem',
        height: '0.9rem'
      }
    },
    process: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      [theme.breakpoints.down('md')]: {
        justifyContent: 'flex-start'
      }
    },
    imgDetail: {
      height: 45,
      [theme.breakpoints.down('sm')]: {
        height: 40
      }
    },
    marginProcess: {
      marginRight: '10px'
    },
    IconDetail: {
      color: 'lightgray'
    },
    subLabel: {
      fontWeight: 600,
      fontSize: 16,
      [theme.breakpoints.down('sm')]: {
        fontSize: 15
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: 13
      }
    },
    btnShowSmUp: {
      display: 'flex',
      alignItems: 'center'
    }
  })
);
const RoomCardItem: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const { room } = props;
  const BorderLinearProgress = withStyles({
    root: {
      height: 6,
      width: 300,
      backgroundColor: '#ededed',
      borderRadius: 30
    },
    bar: {
      borderRadius: 30,
      backgroundColor: '#43cab8'
    }
  })(LinearProgress);

  return (
    <Fragment>
      <Grid container justify="center" alignContent="center" className={classes.root}>
        <Grid item xs={11} sm={11} md={10} lg={8}>
          <Paper className={classes.paper}>
            <Grid container item xs={12}>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={7} sm={3} md={3} lg={2} className={classes.widthImg}>
                    <img
                      className={classes.img}
                      src={`https://a0.muscache.com/im/pictures/21e3f50a-9471-433f-9fb3-b852aa12814a.jpg?aki_policy=xx_large`}
                      alt="Westay - Homestay cho người việt"
                    />
                  </Grid>
                  <Hidden smUp>
                    <Grid item xs={5} className={classes.btnShowSmUp}>
                      <Grid item>
                        <IconButton
                          color="primary"
                          className={classes.IconButton}
                          aria-label="Edit">
                          <EditIcon className={classes.sizeButton} />
                        </IconButton>
                        <IconButton
                          color="primary"
                          className={classes.IconButton}
                          aria-label="Search">
                          <SearchIcon className={classes.sizeButton} />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Hidden>
                  <Grid item xs={12} sm={9} md={9} lg={10}>
                    <Grid className={classes.content}>
                      <Grid container>
                        <Grid item xs={12} sm={10} className={classes.infoRoomName}>
                          <span>
                            <Link href="/terms-and-conditions" className={classes.roomName}>
                              {room.about_room ? room.about_room.name : 'Chưa có tên căn hộ'}
                              <img
                                src={'/static/images/verified.svg'}
                                alt="Verified"
                                className={classes.iconVerified}
                              />
                            </Link>
                          </span>
                        </Grid>
                        <Hidden xsDown>
                          <Grid container item xs={2} justify="flex-end">
                            <Grid item>
                              <IconButton
                                color="primary"
                                className={classes.IconButton}
                                aria-label="Edit">
                                <EditIcon className={classes.sizeButton} />
                              </IconButton>
                              <IconButton
                                color="primary"
                                className={classes.IconButton}
                                aria-label="Search">
                                <SearchIcon className={classes.sizeButton} />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Hidden>
                      </Grid>
                      <Grid className={classes.price}>
                        <Grid container item xs={12} sm={12} lg={10} spacing={1}>
                          <Grid item xs={6} sm={3} lg={6} xl={3} className={classes.wrapperIcon}>
                            <Grid container>
                              <Grid item xs={2} className={classes.spanIcon}>
                                <FontAwesomeIcon
                                  className={classes.customIcon}
                                  icon={faUserFriends}></FontAwesomeIcon>
                              </Grid>
                              <Grid className={classes.nameIcon} item xs={10}>
                                <Typography variant="subtitle1" className={classes.priceDay}>
                                  3 khách
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={6} sm={3} lg={6} xl={3} className={classes.wrapperIcon}>
                            <Grid container>
                              <Grid item xs={2} className={classes.spanIcon}>
                                <FontAwesomeIcon
                                  className={classes.customIcon}
                                  icon={faBed}></FontAwesomeIcon>
                              </Grid>
                              <Grid className={classes.nameIcon} item xs={10}>
                                <Typography variant="subtitle1" className={classes.priceDay}>
                                  2 giường
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={6} sm={3} lg={6} xl={3} className={classes.wrapperIcon}>
                            <Grid container>
                              <Grid item xs={2} className={classes.spanIcon}>
                                <FontAwesomeIcon
                                  className={classes.customIcon}
                                  icon={faBath}></FontAwesomeIcon>
                              </Grid>
                              <Grid className={classes.nameIcon} item xs={10}>
                                <Typography variant="subtitle1" className={classes.priceDay}>
                                {room.bathrooms.number_bathroom} phòng tắm
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={6} sm={3} lg={6} xl={3} className={classes.wrapperIcon}>
                            <Grid container>
                              <Grid item xs={2} className={classes.spanIcon}>
                                <FontAwesomeIcon
                                  className={classes.customIcon}
                                  icon={faDoorOpen}></FontAwesomeIcon>
                              </Grid>
                              <Grid className={classes.nameIcon} item xs={10}>
                                <Typography variant="subtitle1" className={classes.priceDay}>
                                {room.bedrooms.number_bedroom} phòng ngủ
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={12} lg={6} className={classes.infoRoomName}>
                          <Typography variant="subtitle1" className={classes.priceDay}>
                            1.000.000 vnđ/ 1ngày - 500.000 vnđ/ 4giờ
                          </Typography>
                        </Grid>
                        <Grid container item xs={12} lg={6}>
                          <Grid item xs={12} className={classes.process}>
                            <BorderLinearProgress
                              className={classes.marginProcess}
                              variant="determinate"
                              color="secondary"
                              value={50}
                            />
                            <span> 78%</span>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider className={classes.marginLabel} />
            <Grid className={classes.price}>
              <Grid container spacing={1}>
                <Grid item xs={6} sm={6} md={3} lg xl={3}>
                  <Grid container>
                    <Grid item xs={4} sm={3} md={12} lg={3} className={classes.maxWidthIcon}>
                      <img
                        src={'/static/images/house.svg'}
                        alt="House"
                        className={classes.imgDetail}
                      />
                    </Grid>
                    <Grid className={classes.nameIcon} item xs={8} sm={9} lg={9} md={12}>
                      <Typography variant="subtitle1" className={classes.priceDay}>
                        Loại phòng
                      </Typography>
                      <Typography variant={'body1'} className={classes.subLabel}>
                        {room.accommodation_type_txt}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6} sm={6} md={3} lg xl={3}>
                  <Grid container>
                    <Grid item xs={4} sm={3} md={12} lg={3} className={classes.maxWidthIcon}>
                      <img
                        src={room.instant_book === 1 ? '/static/images/flash.svg' : '/static/images/flashWhite.svg'}
                        alt="Flash"
                        className={classes.imgDetail}
                      />
                    </Grid>
                    <Grid className={classes.nameIcon} item xs={8} sm={9} lg={9} md={12}>
                      <Typography variant="subtitle1" className={classes.priceDay}>
                        Loại đặt phòng
                      </Typography>
                      <Typography variant={'body1'} className={classes.subLabel}>
                       {room.instant_book === 1 ? "Đặt nhanh" : room.instant_book_txt}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                  <Grid container>
                    <Grid item xs={4} sm={3} md={12} lg={3} className={classes.maxWidthIcon}>
                      <img
                        src={'/static/images/rentType.svg'}
                        alt="Rent Type"
                        className={classes.imgDetail}
                      />
                    </Grid>
                    <Grid className={classes.nameIcon} item xs={8} sm={9} lg={9} md={12}>
                      <Typography variant="subtitle1" className={classes.priceDay}>
                        Thuê theo
                      </Typography>
                      <Typography variant={'body1'} className={classes.subLabel}>
                        Cả ngày và giờ
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                  <Grid container>
                    <Grid item xs={4} sm={3} md={12} lg={3} className={classes.maxWidthIcon}>
                      <img
                        src={'/static/images/policy.svg'}
                        alt="Policy"
                        className={classes.imgDetail}
                      />
                    </Grid>
                    <Grid className={classes.nameIcon} item xs={8} sm={9} lg={9} md={12}>
                      <Typography variant="subtitle1" className={classes.priceDay}>
                        Chính sách hủy
                      </Typography>
                      <Typography variant={'body1'} className={classes.subLabel}>
                        Strict
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};
export default RoomCardItem;
