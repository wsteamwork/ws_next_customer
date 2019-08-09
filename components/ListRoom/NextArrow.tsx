import { withStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import Button from '@material-ui/core/Button';
import React, { ComponentType, Fragment, FC } from 'react';
import { compose } from 'recompose';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import Fab from '@material-ui/core/Fab';
import classNames from 'classnames';
import { CustomArrowProps } from 'react-slick';

interface IProps extends CustomArrowProps {}

const NextArrow: FC<IProps> = (props) => {
  const { className, onClick } = props;

  return (
    <Fragment>
      <Fab
        className={classNames('nextArrow', props.className)}
        onClick={onClick}
        disableRipple={true}>
        <ArrowForwardIos className="arrowIcon" />
      </Fab>
    </Fragment>
  );
};

export default NextArrow;
