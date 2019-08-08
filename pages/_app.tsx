import React from 'react';
import App, { Container, AppProps, AppContext } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import '@/styles/index.scss';
import 'tippy.js/themes/light-border.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import ProviderGlobal from '@/utils/ProviderGlobal';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import withRedux, { NextJSContext } from 'next-redux-wrapper';
import { makeStore } from '@/store/Redux';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

interface NextContextApp extends NextJSContext, AppContext { }
interface IProps extends AppProps {
  isServer: boolean;
  store: any;
}

class MyApp extends App<IProps> {
  static async getInitialProps({ Component, ctx, router }: any) {
    let pageProps = {};

    ctx.router = router;

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
    const { Component, pageProps, isServer, store } = this.props;

    return (
      <Container>
        <ProviderGlobal>
          <Provider store={store}>
            <PersistGate
              persistor={store.__persistor}
              loading={!process.browser ? <Component {...pageProps} /> : null}>
              <Component {...pageProps} />
            </PersistGate>
          </Provider>
        </ProviderGlobal>
      </Container>
    );
  }
}

export default withRedux(makeStore)(MyApp);
