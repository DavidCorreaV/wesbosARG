import PropTypes from 'prop-types';
import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';

const Product = ({ product }) => (
  <ItemStyles>
    <img
      src={product?.photo?.image?.publicUrlTransformed}
      alt={product?.photo?.altText || product.name}
    />
    <Title>
      <Link href={`/products/${product.id}`}>{product.name}</Link>
    </Title>
    <PriceTag>{formatMoney(product.price / 100)}</PriceTag>
    <p>{product.description}</p>
    {/* Todo add buttons to edit and delete item */}
  </ItemStyles>
);
export default Product;

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    name: PropTypes.string,
    photo: PropTypes.object,
    price: PropTypes.number,
    __typename: PropTypes.oneOf(['Product']),
  }),
};
