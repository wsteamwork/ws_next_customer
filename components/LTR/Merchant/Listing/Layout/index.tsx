import React, { Fragment, FC, useState } from 'react';
import Grid, { GridProps } from '@material-ui/core/Grid/Grid';
import ProgressStepper from './ProgressStepper';
import BottomNavigation from '@/components/LTR/Merchant/Listing/Layout/BottomNavigation';
import GridContainer from '@/components/Layout/Grid/Container';
import Logo from '@/components/Toolbar/Logo';
import HeaderNav from './HeaderNavigation';

interface IProps {
  title: string;
  nextLink: string;
  backLink: string;
}

const Layout: FC<IProps> = (props) => {
  const { nextLink, backLink, title } = props;
  const [percentage, setPercentage] = useState<number>(0);

  return (
    <Grid className="listing-container">
      <HeaderNav percentage={percentage} title={title} />
      <GridContainer xs={7} classNameItem="listing-content">
        <Grid className="listing-content-wrapper">{props.children}</Grid>
        <BottomNavigation
          nextLink={nextLink}
          backLink={backLink}
          percentage={percentage}
          setPercentage={setPercentage}
        />
      </GridContainer>
    </Grid>
  );
};

export default Layout;
