import React, { FC } from 'react';
import GridContainer from '../Layout/Grid/Container';
import { Grid } from '@material-ui/core';
import LazyLoad from 'react-lazyload';
import ButtonGlobal from '../ButtonGlobal';

const HostBecome: FC = () => {
  return (
    <LazyLoad>
      <GridContainer xs={10}>
        <Grid container className="hostBecome">
          <Grid item xs={12} md={7}>
            <h3 className="title">Trở thành chủ nhà</h3>
            <Grid>
              <p className="desc">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia accusamus dolore
                ea ullam explicabo, placeat nostrum aliquam magnam sit accusantium, dolorum odio cum
                officiis? Dolorem illo error repellendus necessitatibus itaque?
              </p>
            </Grid>

            <Grid className="hostBecome__button">
              <a href="https://merchant.westay.vn/" target="__blank">
                <ButtonGlobal linear={['#000', '#000']}>Trở thành chủ nhà</ButtonGlobal>
              </a>
            </Grid>
          </Grid>

          <Grid item xs={12} md={5} className="flex_center">
            <img
              className="hostBecome__image"
              src="./static/images/cta-img2.png"
              alt="Trở thành chủ nhà"
            />
          </Grid>
        </Grid>
      </GridContainer>
    </LazyLoad>
  );
};

export default HostBecome;
