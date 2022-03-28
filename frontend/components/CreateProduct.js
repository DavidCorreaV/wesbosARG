import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';

import Form from './styles/Form';
import DisplayError from './ErrorMessage';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    #Variables to pass
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVALIABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      status
      name
    }
  }
`;

const CreateProduct = () => {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: 'Name',
    price: 100,
    image: '',
    description: '',
  });
  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    { variables: inputs }
  );
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        await createProduct();

        clearForm();
      }}
    >
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
};
export default CreateProduct;
