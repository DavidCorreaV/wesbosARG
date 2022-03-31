import SingleProduct from '../../components/SingleProduct';

// eslint-disable-next-line react/prop-types
const SingleProductPage = ({ query: product }) => (
  // eslint-disable-next-line react/prop-types
  <SingleProduct id={product.id} />
);
export default SingleProductPage;
