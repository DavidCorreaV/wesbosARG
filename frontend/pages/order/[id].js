import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';
import DisplayError from '../../components/ErrorMessage';
import OrderStyles from '../../components/styles/OrderStyles';
import formatMoney from '../../lib/formatMoney';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order: Order(where: { id: $id }) {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

const SingleOrderPage = ({ query }) => {
  const { data, error, loading } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { id: query.id },
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <DisplayError error={error} />;
  }
  const { order } = data;

  return (
    <OrderStyles>
      <Head>
        <title>Sick-Fits - Order {order.id}</title>
      </Head>
      <p>
        <span>Order id:</span>
        <span>{order.id}</span>
      </p>
      <p>
        <span>Charge: </span>
        <span>{order.charge}</span>
      </p>
      <p>
        <span>Oder Total: </span>
        <span>{formatMoney(order.total / 100)}</span>
      </p>
      <p>
        <span>Item Count: </span>
        <span>{order.items.length}</span>
      </p>
      <div className="items">
        {order.items.map((item) => (
          <div className="order-item" key={item.id}>
            <img src={item.photo.image.publicUrlTransformed} alt={item.name} />
            <div className="item-details">
              <h2>{item.name}</h2>
              <p>{item.quantity}</p>
              <p>Qty: {item.quantity}</p>
              <p>Each: {formatMoney(item.price / 100)}</p>
              <p>Subtotal: {formatMoney((item.price * item.quantity) / 100)}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  );
};

export default SingleOrderPage;
