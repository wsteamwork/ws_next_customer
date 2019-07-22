import React from 'react';
import App, { Container } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import '@/styles/index.scss';
import ProviderGlobal from '@/utils/ProviderGlobal';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
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
