import Page from '../components/Page';

// eslint-disable-next-line react/prop-types
const App = ({ Component, pageProps }) => (
  <Page>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </Page>
);
export default App;
