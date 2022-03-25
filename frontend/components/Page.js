import PropTypes from 'prop-types';
import Header from './Header';

const Page = ({ children }) => (
  <>
    <Header />
    <h2>I am the page component</h2>
    {children}
  </>
);
export default Page;

Page.propTypes = {
  children: PropTypes.any,
};
