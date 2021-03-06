import React, { FC, useContext, Fragment, useState, MouseEvent } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Hidden } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Orange from '@material-ui/core/colors/orange';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    name: {
      fontWeight: 900,
      margin: '1rem 0 1rem 0'
    },
    icon: {
      color: '#08C299',
      marginRight: 5
    },
    nameIcon: {
      display: 'flex',
      alignItems: 'center'
    },
    rowMargin: {
      marginBottom: 10,
      fontWeight: 300
    },
    roomAmenitiesIcon: {
      verticalAlign: 'bottom',
      width: 32,
      height: 32
    },
    button: {
      color: Orange[500],
      '&:hover': {
        backgroundColor: '#fff'
      },
      '&:focus': {
        backgroundColor: '#fff'
      },
      [theme.breakpoints.down('lg')]: {
        fontSize: '12px',
        paddingLeft: '10px !important'
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '22px',
        paddingLeft: '0 !important'
      }
    },
    readLess: {
      color: Orange[500],
      '&:hover': {
        backgroundColor: '#fff'
      },
      '&:focus': {
        backgroundColor: '#fff'
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '12px'
      }
    },
    buttonLess: {
      paddingLeft: '0 !important',
      [theme.breakpoints.up('md')]: {
        padding: '10px 0 !important'
      },
      [theme.breakpoints.down('sm')]: {
        paddingLeft: '0 !important'
      }
    },
    iconPlus: {
      fontSize: '15px',
      [theme.breakpoints.down('xs')]: {
        fontSize: '19px'
      }
    }
  })
);

interface IProps {}

const RoomAmenities: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const { width } = useContext(GlobalContext);
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.roomPage.room);

  const MAX_ITEMS = width === 'xs' ? 5 : 8;
  const MORE_ITEMS = !!room && room.comforts.data.length - MAX_ITEMS;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const getRenderedItems = () => {
    if (isOpen) {
      return room.comforts.data;
    }
    return room.comforts.data.slice(0, MAX_ITEMS);
  };

  return (
    !!room && (
      <Fragment>
        <Typography variant="h5" className={classes.name}>
          {t('rooms:amenities')}
        </Typography>
        <Grid container spacing={3} className={classes.rowMargin}>
          {_.map(getRenderedItems(), (o, i) => (
            <Fragment key={i}>
              <Grid item xs={2} sm={1} md={1} lg={1}>
                <img
                  src={o.icon}
                  alt={o.details.data[0].name}
                  className={classes.roomAmenitiesIcon}
                />
              </Grid>
              <Hidden xsDown>
                <Grid className={classes.nameIcon} item sm={3} md={3} lg={3}>
                  <Typography variant={'body2'}>{o.details.data[0].name}</Typography>
                </Grid>
              </Hidden>
            </Fragment>
          ))}
          {!isOpen ? (
            <Grid item xs={2} className={classes.buttonLess}>
              <Button onClick={toggle} className={classes.button} size="small">
                <AddIcon className={classes.iconPlus} />
                {MORE_ITEMS} <Hidden xsDown>{t('rooms:amenitiesLower')}</Hidden>
              </Button>
            </Grid>
          ) : (
            <Grid item xs={2} className={classes.buttonLess}>
              <Button onClick={toggle} className={classes.readLess} size="small">
                {t('rooms:readLess')}
              </Button>
            </Grid>
          )}
        </Grid>
      </Fragment>
    )
  );
};

export default RoomAmenities;
