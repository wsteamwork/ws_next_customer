import React, { Fragment, FC, useState, Dispatch, SetStateAction } from 'react';
import Grid, { GridProps } from '@material-ui/core/Grid/Grid';
import ProgressStepper from './ProgressStepper';
import ButtonGlobal from '@/components/ButtonGlobal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from '@material-ui/core';
import GridContainer from '@/components/Layout/Grid/Container';

interface IProps {
  setPercentage?: Dispatch<SetStateAction<number>>;
  percentage: number;
  nextLink: string;
  backLink: string;
}

const Layout: FC<IProps> = (props) => {
  const { setPercentage, percentage, backLink, nextLink } = props;

  return (
    <GridContainer xs={7} className="bottom-navigation" classNameItem="wrapper">
      <Grid className="prev-button">
        <Link href={backLink} className="prev-link" onClick={() => setPercentage(percentage - 10)}>
          <FontAwesomeIcon icon={faChevronLeft} size="2x" color="#fa991c"></FontAwesomeIcon>
          <span className="prev-title">Back</span>
        </Link>
      </Grid>
      <Grid className="next-button">
        <Link href={nextLink}>
          <ButtonGlobal onClick={() => setPercentage(percentage + 10)}>Next</ButtonGlobal>
        </Link>
      </Grid>
    </GridContainer>
  );
};

export default Layout;
