import ButtonGlobal from '@/components/ButtonGlobal';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import {
  DetailsReducerAction,
  getListingDetails
} from '@/store/Redux/Reducers/LTR/CreateListing/Step2/details';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import {
  createStyles,
  Divider,
  Grid,
  Link,
  Theme,
  Paper,
  Fab,
  IconButton
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/styles';
import React, { FC, Fragment, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faBed, faBath, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import LinearProgress from '@material-ui/core/LinearProgress';
interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    paper: {
      padding: '24px'
    },
    title: {
      fontWeight: 600
    },
    marginTitle: {
      margin: '8px 0'
    },
    icon: {
      color: '#ffffff',
      backgroundColor: '#007DCC',
      border: '1.5px solid #007DCC',
      borderRadius: '50%'
    },
    sizeBtn: {
      fontSize: '1rem'
    },
    content: {
      height: '100%',
      flexDirection: 'column',
      marginLeft: '0.5rem'
    },
    img: {
      display: 'block',
      width: '150px',
      objectFit: 'cover',
      border: '1px solid #efefef',
      borderRadius: '10px'
    },
    roomName: {
      fontSize: '1.2rem',
      color: '#48465b',
      fontWeight: 600,
      alignItems: 'center',
      marginRight: '0.5rem'
    },
    textContent: {
      fontSize: '1rem'
    },
    price: {
      display: 'flex',
      justifyContent: 'flex-start',
      margin: '5px 0'
    },
    priceHour: {
      fontSize: 14
    },
    priceDay: {
      marginRight: '1rem',
      fontSize: 14
    },
    link: {
      color: '#484848'
    },
    infoRoomName: {
      display: 'flex'
    },
    iconVerified: {
      height: '20px',
      width: '20px'
    },
    spanIcon: {
      display: 'flex',
      alignItems: 'center'
    },
    marginLabel: {
      margin: '24px 0'
    },
    fab: {
      marginRight: theme.spacing(1),
      boxShadow: 'none'
    },
    iconAction: {},
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
    process: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    marginProcess: {
      margin: '0 10px'
    },
    IconDetail: {
        color: 'lightgray'
    }
  })
);
const RoomCardItem: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const listing = useSelector<ReducersList, any>((state) => state.details.listing);
  const dispatch = useDispatch<Dispatch<DetailsReducerAction>>();
  useEffect(() => {
    if (!listing) {
      getListingDetails(id, dispatch);
    }
  }, []);

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
      <Grid container spacing={3} justify="center" alignContent="center">
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <Grid container item xs={12}>
              <Grid item xs={7}>
                <Grid container>
                  <Grid item xs={3}>
                    <img
                      className={classes.img}
                      src={`https://a0.muscache.com/im/pictures/21e3f50a-9471-433f-9fb3-b852aa12814a.jpg?aki_policy=xx_large`}
                      alt="Westay - Homestay cho người việt"
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <Grid item xs className={classes.content}>
                      <Grid className={classes.infoRoomName}>
                        <span className={classes.roomName}>Spring Truc Bach Homestay</span>
                        <span className={classes.spanIcon}>
                          <img
                            src={'/static/images/verified.svg'}
                            alt="Verified"
                            className={classes.iconVerified}
                          />
                        </span>
                      </Grid>
                      <Grid className={classes.price}>
                        <Grid container spacing={1}>
                          <Grid item xs={6} sm={6} md={3} lg xl={3}>
                            <Grid container>
                              <Grid item xs={2} sm={2}>
                                <FontAwesomeIcon icon={faUserFriends}></FontAwesomeIcon>
                              </Grid>
                              <Grid className={classes.nameIcon} item xs={10} sm={10}>
                                <Typography variant={'body2'}>3 khách</Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={6} sm={6} md={3} lg xl={3}>
                            <Grid container>
                              <Grid item xs={2} sm={2}>
                                <FontAwesomeIcon icon={faBed}></FontAwesomeIcon>
                              </Grid>
                              <Grid className={classes.nameIcon} item xs={10} sm={10}>
                                <Typography variant={'body2'}>2 giường</Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                            <Grid container>
                              <Grid item xs={2} sm={2}>
                                <FontAwesomeIcon icon={faBath}></FontAwesomeIcon>
                              </Grid>
                              <Grid className={classes.nameIcon} item xs={10} sm={10}>
                                <Typography variant={'body2'}>23 tiện ích</Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                            <Grid container>
                              <Grid item xs={2} sm={2}>
                                <FontAwesomeIcon icon={faDoorOpen}></FontAwesomeIcon>
                              </Grid>
                              <Grid className={classes.nameIcon} item xs={10} sm={10}>
                                <Typography variant={'body2'}>3 phòng ngủ</Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid className={classes.price}>
                        <Typography variant="subtitle1" className={classes.priceDay}>
                          1.000.000 vnđ/ 1ngày - 500.000 vnđ/ 4giờ
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container item xs={5} justify="flex-end">
                <Grid item>
                  <IconButton color="primary" className={classes.IconButton} aria-label="Edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="primary" className={classes.IconButton} aria-label="Search">
                    <SearchIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={12} className={classes.process}>
                  <span>Hoàn thành: </span>
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
            <Divider className={classes.marginLabel} />
            <Grid className={classes.price}>
              <Grid container spacing={1}>
                <Grid item xs={6} sm={6} md={3} lg xl={3}>
                  <Grid container>
                    <Grid item xs={4}>
                      <FontAwesomeIcon size="3x" icon={faUserFriends} className={classes.IconDetail}></FontAwesomeIcon>
                    </Grid>
                    <Grid className={classes.nameIcon} item xs={8}>
                      <Typography variant={'body2'}>Giá dài hạn</Typography>
                      <Typography variant={'body2'}>3000$/ 1tháng</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6} sm={6} md={3} lg xl={3}>
                  <Grid container>
                    <Grid item xs={4}>
                      <FontAwesomeIcon size="3x" icon={faBed} className={classes.IconDetail}></FontAwesomeIcon>
                    </Grid>
                    <Grid className={classes.nameIcon} item xs={8}>
                      <Typography variant={'body2'}>Giá theo ngày</Typography>
                      <Typography variant={'body2'}>200$/ 1ngày</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                  <Grid container>
                    <Grid item xs={4}>
                      <FontAwesomeIcon size="3x" icon={faBath} className={classes.IconDetail}></FontAwesomeIcon>
                    </Grid>
                    <Grid className={classes.nameIcon} item xs={8}>
                      <Typography variant={'body2'}>Giá theo giờ</Typography>
                      <Typography variant={'body2'}>230$/ 4giờ</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                  <Grid container>
                    <Grid item xs={4}>
                      <FontAwesomeIcon size="3x" icon={faDoorOpen} className={classes.IconDetail}></FontAwesomeIcon>
                    </Grid>
                    <Grid className={classes.nameIcon} item xs={8}>
                      <Typography variant={'body2'}>Phòng ngủ</Typography>
                      <Typography variant={'body2'}>3000$</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} justify="center" alignContent="center">
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <Grid container item xs={12}>
              <Grid item xs={7}>
                <Grid container>
                  <Grid item xs={3}>
                    <img
                      className={classes.img}
                      src={`https://a0.muscache.com/im/pictures/21e3f50a-9471-433f-9fb3-b852aa12814a.jpg?aki_policy=xx_large`}
                      alt="Westay - Homestay cho người việt"
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <Grid item xs className={classes.content}>
                      <Grid className={classes.infoRoomName}>
                        <span className={classes.roomName}>Spring Truc Bach Homestay</span>
                        <span className={classes.spanIcon}>
                          <img
                            src={'/static/images/verified.svg'}
                            alt="Verified"
                            className={classes.iconVerified}
                          />
                        </span>
                      </Grid>
                      <Grid className={classes.price}>
                        <Grid container spacing={1}>
                          <Grid item xs={6} sm={6} md={3} lg xl={3}>
                            <Grid container>
                              <Grid item xs={2} sm={2}>
                                <FontAwesomeIcon icon={faUserFriends}></FontAwesomeIcon>
                              </Grid>
                              <Grid className={classes.nameIcon} item xs={10} sm={10}>
                                <Typography variant={'body2'}>3 khách</Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={6} sm={6} md={3} lg xl={3}>
                            <Grid container>
                              <Grid item xs={2} sm={2}>
                                <FontAwesomeIcon icon={faBed}></FontAwesomeIcon>
                              </Grid>
                              <Grid className={classes.nameIcon} item xs={10} sm={10}>
                                <Typography variant={'body2'}>2 giường</Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                            <Grid container>
                              <Grid item xs={2} sm={2}>
                                <FontAwesomeIcon icon={faBath}></FontAwesomeIcon>
                              </Grid>
                              <Grid className={classes.nameIcon} item xs={10} sm={10}>
                                <Typography variant={'body2'}>23 tiện ích</Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                            <Grid container>
                              <Grid item xs={2} sm={2}>
                                <FontAwesomeIcon icon={faDoorOpen}></FontAwesomeIcon>
                              </Grid>
                              <Grid className={classes.nameIcon} item xs={10} sm={10}>
                                <Typography variant={'body2'}>3 phòng ngủ</Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid className={classes.price}>
                        <Typography variant="subtitle1" className={classes.priceDay}>
                          Đây là một căn hộ mang phong cách thiên nhiên của mùa xuân Hà Nội nằm trên
                          đường Nguyễn Biểu bên cạnh hồ Trúc Bạch...
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container item xs={5} justify="flex-end">
                <Grid item>
                  <IconButton color="primary" className={classes.IconButton} aria-label="Edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="primary" className={classes.IconButton} aria-label="Search">
                    <SearchIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={12} className={classes.process}>
                  <span>Hoàn thành: </span>
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
            <Divider className={classes.marginLabel} />
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3} justify="center" alignContent="center">
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <Grid container item xs={12}>
              <Grid item xs={7}>
                <Grid container>
                  <Grid item xs={3}>
                    <img
                      className={classes.img}
                      src={`https://a0.muscache.com/im/pictures/21e3f50a-9471-433f-9fb3-b852aa12814a.jpg?aki_policy=xx_large`}
                      alt="Westay - Homestay cho người việt"
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <Grid item xs className={classes.content}>
                      <Grid className={classes.infoRoomName}>
                        <span className={classes.roomName}>Spring Truc Bach Homestay</span>
                        <span className={classes.spanIcon}>
                          <img
                            src={'/static/images/verified.svg'}
                            alt="Verified"
                            className={classes.iconVerified}
                          />
                        </span>
                      </Grid>
                      <Grid className={classes.price}>
                        <Grid container spacing={1}>
                          <Grid item xs={6} sm={6} md={3} lg xl={3}>
                            <Grid container>
                              <Grid item xs={2} sm={2}>
                                <FontAwesomeIcon icon={faUserFriends}></FontAwesomeIcon>
                              </Grid>
                              <Grid className={classes.nameIcon} item xs={10} sm={10}>
                                <Typography variant={'body2'}>3 khách</Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={6} sm={6} md={3} lg xl={3}>
                            <Grid container>
                              <Grid item xs={2} sm={2}>
                                <FontAwesomeIcon icon={faBed}></FontAwesomeIcon>
                              </Grid>
                              <Grid className={classes.nameIcon} item xs={10} sm={10}>
                                <Typography variant={'body2'}>2 giường</Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                            <Grid container>
                              <Grid item xs={2} sm={2}>
                                <FontAwesomeIcon icon={faBath}></FontAwesomeIcon>
                              </Grid>
                              <Grid className={classes.nameIcon} item xs={10} sm={10}>
                                <Typography variant={'body2'}>23 tiện ích</Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                            <Grid container>
                              <Grid item xs={2} sm={2}>
                                <FontAwesomeIcon icon={faDoorOpen}></FontAwesomeIcon>
                              </Grid>
                              <Grid className={classes.nameIcon} item xs={10} sm={10}>
                                <Typography variant={'body2'}>3 phòng ngủ</Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid className={classes.price}>
                        <Typography variant="subtitle1" className={classes.priceDay}>
                          Đây là một căn hộ mang phong cách thiên nhiên của mùa xuân Hà Nội nằm trên
                          đường Nguyễn Biểu bên cạnh hồ Trúc Bạch...
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container item xs={5} justify="flex-end">
                <Grid item>
                  <IconButton color="primary" className={classes.IconButton} aria-label="Edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="primary" className={classes.IconButton} aria-label="Search">
                    <SearchIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={12} className={classes.process}>
                  <span>Hoàn thành: </span>
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
            <Divider className={classes.marginLabel} />
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};
export default RoomCardItem;
