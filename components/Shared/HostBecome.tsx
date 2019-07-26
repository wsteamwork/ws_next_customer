import React, { FC, useContext, useMemo, memo } from 'react';
import GridContainer from '../Layout/Grid/Container';
import { Grid } from '@material-ui/core';
import LazyLoad from 'react-lazyload';
import ButtonGlobal from '../ButtonGlobal';
import { GlobalContext } from '@/store/Context/GlobalContext';

const HostBecome: FC = () => {
  const { width } = useContext(GlobalContext);

  const desc = useMemo(() => {
    const text = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia accusamus dolore
    ea ullam explicabo, placeat nostrum aliquam magnam sit accusantium, dolorum odio cum
    officiis? Dolorem illo error repellendus necessitatibus itaque?`;

    if (width === 'sm') {
      return `${text.substr(0, 100)}...`;
    } else if (width === 'xs') {
      return `${text.substr(0, 50)}...`;
    }

    return text;
  }, [width]);

  return (
    <LazyLoad>
      <GridContainer xs={12} sm={12} md={10}>
        <Grid container className="hostBecome">
          <Grid item xs={7}>
            <h3 className="title">Trở thành chủ nhà</h3>
            <Grid>
              <p className="desc">{desc}</p>
            </Grid>

            <Grid className="hostBecome__button">
              <a href="https://merchant.westay.vn/" target="__blank">
                <ButtonGlobal background="#000" className="hostBecome__buttonGlobal">
                  Trở thành chủ nhà
                </ButtonGlobal>
              </a>
            </Grid>
          </Grid>

          <Grid item xs={5} className="flex_center">
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

export default memo(HostBecome);
