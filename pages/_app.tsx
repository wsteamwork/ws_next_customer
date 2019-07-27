import React from 'react';
import App, { Container, AppProps, AppContext } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import '@/styles/index.scss';
import 'tippy.js/themes/light-border.css';
import 'typeface-montserrat';
import ProviderGlobal from '@/utils/ProviderGlobal';

class MyApp extends App<AppProps> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    Router.events.on('routeChangeStart', this.handleRouteChangeStart);
    Router.events.on('routeChangeStart', this.handleRouteChangeEnd);
    Router.events.on('routeChangeError', this.handleRouteChangeEnd);
  }

  componentWillUnmount() {
    Router.events.off('routeChangeStart', this.handleRouteChangeStart);
    Router.events.off('routeChangeStart', this.handleRouteChangeEnd);
    Router.events.off('routeChangeError', this.handleRouteChangeEnd);
  }

  handleRouteChangeStart = () => {
    NProgress.start();
  };

  handleRouteChangeEnd = () => {
    NProgress.done();
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <ProviderGlobal>
          <Component {...pageProps} />
        </ProviderGlobal>
      </Container>
    );
  }
}

export default MyApp;
