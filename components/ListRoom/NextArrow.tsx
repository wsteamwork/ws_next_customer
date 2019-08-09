import React, { Fragment, FC } from 'react';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import Fab from '@material-ui/core/Fab';
import classNames from 'classnames';
import { CustomArrowProps } from 'react-slick';

interface IProps extends CustomArrowProps { }

const NextArrow: FC<IProps> = (props: CustomArrowProps) => {
  const { onClick } = props;

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
