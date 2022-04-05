/* eslint react/prop-types: 0 */

import styled from 'styled-components';
import { useUser } from './User';
import Supreme from './styles/Supreme';
import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import formatMoney from '../lib/formatMoney';
import calcTotalCart from '../lib/calcTotalCart';
import { useCart } from '../lib/cartState';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-rows: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

// eslint-disable-next-line react/prop-types
const CartItem = ({ item }) => {
  const { product } = item;
  // eslint-disable-next-line react/prop-types
  return (
    <CartItemStyles>
      <img
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
        width="100"
      />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney((product.price * item.quantity) / 100)} -{' '}
          <em>
            {item.quantity}&times; {formatMoney(product.price / 100)}
          </em>
        </p>
      </div>
    </CartItemStyles>
  );
};

const Cart = () => {
  const { closeCart } = useCart();
  const me = useUser();
  const { cartOpen } = useCart();
  if (!me) {
    return null;
  }
  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme> {me.name}'s Cart</Supreme>
        <CloseButton type="button" onClick={closeCart}>
          &times;
        </CloseButton>
      </header>

      <ul>
        {me.cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalCart(me.cart))}</p>
      </footer>
    </CartStyles>
  );
};
export default Cart;
