import React, { Suspense } from 'react';
import App, { Container, AppProps, AppContext } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import '@/styles/index.scss';
import 'tippy.js/themes/light-border.css';
import ProviderGlobal from '@/utils/ProviderGlobal';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, windowExist } from '@/store/Redux';

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

    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
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
          <PersistGate
            persistor={persistor}
            loading={windowExist === false ? <Component {...pageProps} /> : null}>
            <Component {...pageProps} />
          </PersistGate>
        </ProviderGlobal>
      </Container>
    );
  }
}

export default MyApp;
