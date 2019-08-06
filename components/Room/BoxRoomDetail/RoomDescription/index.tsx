import React, { FC, useContext, Fragment, useState, MouseEvent } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { IRoomDetailsContext, RoomDetailsContext } from '@/store/Context/Room/RoomDetailContext';
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';
import Button from '@material-ui/core/Button';
import Orange from '@material-ui/core/colors/orange';
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      lineHeight: '1.8rem'
    },
    name: {
      fontWeight: 900,
      margin: '1.5rem 0 0.4rem 0'
    },
    icon: {
      marginBottom: 10
    },
    button: {
      color: Orange[500],
      padding: 0,
      '&:hover': {
        backgroundColor: '#fff'
      },
      '&:focus': {
        backgroundColor: '#fff'
      }
    },
    iconPlus: {
      fontSize: '15px'
    }
  })
);

interface IProps {}

const RoomDescription: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const { state } = useContext<IRoomDetailsContext>(RoomDetailsContext);
  const { room } = state;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const transformHtmlContent = (node: any, index: number) => {
    if (node.name === 'p' || node.name === 'image') {
      node.attribs.class = classes.tagP_inHtmlPare;
      return convertNodeToElement(node, index, transformHtmlContent);
    }
  };

  return (
    <Fragment>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.name}>
            Thông tin căn hộ
          </Typography>
          <div className="testDes">
            {ReactHtmlParser(room.details.data[0].description, {
              transform: transformHtmlContent
            })}
          </div>
        </Grid>
        {isOpen ? (
          <Fragment>
            <Grid item xs={12}>
              {ReactHtmlParser(room.details.data[0].space, {
                transform: transformHtmlContent
              })}
            </Grid>
            <Grid item xs={12}>
              {ReactHtmlParser(room.details.data[0].note, {
                transform: transformHtmlContent
              })}
            </Grid>
            <Button onClick={toggle} className={classes.button} size="small">
              Thu gọn
            </Button>
          </Fragment>
        ) : (
          <Button onClick={toggle} className={classes.button} size="small">
            &#8230; Xem thêm
          </Button>
        )}
      </Grid>
    </Fragment>
  );
};

export default RoomDescription;
