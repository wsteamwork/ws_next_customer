import React, { ComponentType, Fragment, FC } from 'react';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import { Fab } from '@material-ui/core';
import { CustomArrowProps } from 'react-slick';
import classNames from 'classnames';
interface IProps extends CustomArrowProps { }

const NextArrow: FC<IProps> = (props: CustomArrowProps) => {
  const { onClick } = props;

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
