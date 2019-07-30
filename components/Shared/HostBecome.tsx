import React, { FC, useContext, useMemo, memo } from 'react';
import { Grid } from '@material-ui/core';
import LazyLoad from 'react-lazyload';
import ButtonGlobal from '../ButtonGlobal';
import { GlobalContext } from '@/store/Context/GlobalContext';
import GridContainer from '@/components/Layout/Grid/Container';

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
        <Grid container justify='center' className="hostBecome">
          <Grid container item xs={10}>
            <Grid item xs={8}>
              <h3 className="title">Trở thành chủ nhà</h3>
              <Grid>
                <p className="desc">{desc}</p>
              </Grid>

              <Grid className="hostBecome__button">
                <ButtonGlobal
                  href="https://merchant.westay.vn/"
                  padding="0px 30px"
                  background="#000"
                  className="hostBecome__buttonGlobal">
                  Trở thành chủ nhà
                </ButtonGlobal>
              </Grid>
            </Grid>

            <Grid item xs={4} className="flex_center">
              <img
                className="hostBecome__image"
                src="./static/images/cta-img2.png"
                alt="Trở thành chủ nhà"
              />
            </Grid>
          </Grid>
        </Grid>
    </LazyLoad>
  );
};

export default memo(HostBecome);
