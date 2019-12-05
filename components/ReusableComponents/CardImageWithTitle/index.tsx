import { createStyles, Grid, makeStyles, Paper, Theme, Typography, withStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import ShoppingBasketRoundedIcon from '@material-ui/icons/ShoppingBasketRounded';
import Rating from '@material-ui/lab/Rating';
import { FC, Fragment } from "react";
interface IProps {
  imgSrc?: string
  title?: string,
  subtitle?: string,
  imgAlt?: string,
  rightTextTitle?: string,
  rightTextSubtitle?: string,
  justifyContentCustom?: string,
  rating?: number
};

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    flexDisplayClass: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    paperBackground: {
      backgroundColor: 'white',
      width: '100%'
    },
    imgContainer: {
      borderRadius: '1rem'
    },
    contentBoxContainer: {
      paddingTop: '0.9rem'
    },
    actionBottomContainer: {
      paddingBottom: '1rem',
    },
    actionBoxContainer: {
      paddingTop: '0.9rem'
    },
    contentTextLeft: {
      // paddingLeft: '1rem',
      // paddingRight: '0.5rem'
    },
    imgCard: {
      width: '100%',
      height: '100%',
      maxHeight: '240px',
      objectFit: 'cover',
      borderRadius: '1rem'
    },
    titleText: {
      overflow: 'hidden',
      fontSize: '1.3rem',
      fontWeight: 600,
      overflowWrap: 'break-word',
      color: '#484848',
      lineHeight: '1.8rem',
      marginLeft: '6px',
      marginTop: '6px',
      marginBottom: '6px',
      display: '-webkit-box',
      maxHeight: '1.75rem',
      height: '1.75rem',
      WebkitLineClamp: 1,
      textOverflow: 'ellipsis',
      WebkitBoxOrient: 'vertical'
    },
    subtitleText: {
      overflow: 'hidden',
      fontSize: '0.9rem',
      fontWeight: 600,
      overflowWrap: 'break-word',
      color: '#767676',
      lineHeight: '1.5rem',
      marginLeft: '6px',
      marginTop: '6px',
      marginBottom: '6px',
      display: '-webkit-box',
      maxHeight: '1.5rem',
      height: '1.5rem',
      WebkitLineClamp: 1,
      textOverflow: 'ellipsis',
      WebkitBoxOrient: 'vertical'
    },
    actionBottomLeft: {
      borderRadius: '0.3rem',
      display: 'flex',
      // justifyContent: 'center',
      alignItems: 'center',
      background: 'white',
      // border: '1px solid #0000001f',
      height: '100%'
    },
    boxActionLeftContent: {
      display: 'flex',
      justifyContent: 'center',
      padding: '0.35rem'
    },
    actionBottomRightContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      height: '100%'
    },
    flatButton: {
      // height: '3rem',
      boxShadow: 'none',
      borderRadius: '0.5rem'
    }

  })
);

const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);

function getLabelText(value: number) {
  return `${value} Heart${value !== 1 ? 's' : ''}`;
}

const CardImageWithTitle: FC<IProps> = (props) => {
  const classes = useStyles(props)
  const { imgSrc, title, subtitle, imgAlt, rightTextTitle, rightTextSubtitle, rating } = props;
  return (
    <Fragment>
      <Grid container>
        <Paper elevation={0} className={classes.paperBackground}>
          <Grid container justify="center">
            <Grid item xs={12} className={classes.imgContainer}>
              <img src={imgSrc} alt={imgAlt} className={classes.imgCard} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} className={classes.contentBoxContainer}>
              <Grid container className={classes.contentTextLeft}>
                <Grid item xs={9}>
                  <Typography variant="h6" className={classes.titleText}>{title}</Typography>
                  <Typography variant="subtitle2" className={classes.subtitleText}>{subtitle}</Typography>
                </Grid>
                <Grid item xs={3} className={classes.flexDisplayClass}>
                  <Typography variant="h6" className={classes.rightTextTitle}>{rightTextTitle}</Typography>
                  <Typography variant="subtitle2" className={classes.rightTextSubtitle}>{rightTextSubtitle}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={1} justify="center" className={classes.actionBottomContainer}>
            <Grid item xs={12} className={classes.actionBoxContainer}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Grid container className={classes.actionBottomLeft}>
                    <Grid item>
                      <Box
                        className={classes.boxActionLeftContent}
                        component="fieldset"
                        borderColor="transparent"
                      >
                        <StyledRating
                          name="customized-color"
                          value={rating}
                          getLabelText={getLabelText}
                          precision={0.5}
                          emptyIcon={<FavoriteBorderOutlined fontSize="inherit" />}
                          icon={<Favorite fontSize="inherit" />}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container xs={8} className={classes.actionBottomRightContainer}>
                  <Grid item container xs={6} className={classes.actionBottomRightContent}>
                    <Button fullWidth className={classes.flatButton} variant="outlined" color="primary">
                      <ShoppingBasketRoundedIcon />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Fragment>
  )
}
export default CardImageWithTitle;