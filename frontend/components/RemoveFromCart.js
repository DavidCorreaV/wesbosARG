import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;
const update = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteCartItem));
};
const RemoveFromCart = ({ id }) => {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    update,
    /* 
   Optimistic Response is not working as expected for unknown reasons.
   Pending corrections from wes
   
   optimisticResponse: {
      deleteCartItem: { __typename: 'CartItem', id },
    }, */
  });
  return (
    <button
      disabled={loading}
      type="button"
      onClick={removeFromCart}
      title="Remove From Cart"
    >
      &times;
    </button>
  );
};
export default RemoveFromCart;
