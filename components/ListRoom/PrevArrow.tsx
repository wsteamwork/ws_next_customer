import { withStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import Button from '@material-ui/core/Button';
import React, { ComponentType, Fragment, FC } from 'react';
import { compose } from 'recompose';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import { Fab } from '@material-ui/core';
import { CustomArrowProps } from 'react-slick';
import classNames from 'classnames';
interface IProps {
  classes?: any;
  onClick?: any;
}

const NextArrow: FC<IProps> = (props: CustomArrowProps) => {
  const { classes, onClick } = props;

  return (
    <Fragment>
      <Fab
        className={classNames('prevArrow', props.className)}
        onClick={props.onClick}
        disableRipple={true}>
        <ArrowBackIos className="arrowIcon" />
      </Fab>
    </Fragment>
  );
};

export default NextArrow;
