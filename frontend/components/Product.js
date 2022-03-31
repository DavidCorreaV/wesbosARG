import PropTypes from 'prop-types';
import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteProduct from './DeleteProduct';

const Product = ({ product }) => (
  <ItemStyles>
    <img
      src={product?.photo?.image?.publicUrlTransformed}
      alt={product?.photo?.altText || product.name}
    />
    <Title>
      <Link href={`/product/${product.id}`}>{product.name}</Link>
    </Title>
    <PriceTag>{formatMoney(product.price / 100)}</PriceTag>
    <p>{product.description}</p>
    <div className="buttonList">
      <Link href={{ pathname: '/update', query: { id: product.id } }}>
        Edit ✎
      </Link>
      <DeleteProduct id={product.id}>Delete 🗑</DeleteProduct>
    </div>
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
