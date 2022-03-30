import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useState } from 'react';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

const update = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteProduct));
};

const DeleteProduct = ({ id, children }) => {
  const [count, setCount] = useState(1);
  const [output, setOutput] = useState(children);

  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update,
  });
  const handleClick = () => {
    setCount(count + 1);
    if (count === 1) {
      setOutput('Click again to confirm');
    }
    if (count === 2) {
      setOutput('Click again if you are super sure');
    }
    if (count === 3) {
      setOutput('Last chance. Click to proceed.');
    }
    if (count === 4) {
      setOutput('Deleting...');
      deleteProduct().catch((e) => alert(e.message));
      setCount(1);
    }
  };
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <button type="button" disabled={loading} onClick={handleClick}>
      {output}
    </button>
  );
};
export default DeleteProduct;
