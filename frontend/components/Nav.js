import Link from 'next/link';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';
import { useCart } from '../lib/cartState';
import CartCount from './CartCount';
// import formatMoney from '../lib/formatMoney';

const Nav = () => {
  const { openCart } = useCart();
  const user = useUser();
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
          <button type="button" onClick={openCart}>
            My Cart
            <CartCount
              /* 
              Change this to get total price instead
              count={formatMoney(
                user.cart.reduce(
                  (count, item) => count + item.product.price * item.quantity,
                  0
                ) / 100
              )} */
              count={user.cart.reduce(
                (count, item) => count + item.quantity,
                0
              )}
            />
          </button>
        </>
      )}
	   {!user && (
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </NavStyles>
  );
};
export default Nav;
