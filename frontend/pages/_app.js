import NProgress from 'nprogress';
import '../components/styles/nprogress.css';

import Router from 'next/router';

import { ApolloProvider } from '@apollo/client';
import Page from '../components/Page';

import withData from '../lib/withData';

import { CartStateProvider } from '../lib/cartState';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});
Router.events.on('routeChangeError', () => {
  NProgress.done();
});
// eslint-disable-next-line react/prop-types
const App = ({ Component, pageProps, apollo }) => (
  <ApolloProvider client={apollo}>
    <CartStateProvider>
      <Page>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </Page>
    </CartStateProvider>
  </ApolloProvider>
);

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};
export default withData(App);
