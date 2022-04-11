import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';
import DisplayError from '../../components/ErrorMessage';

const OrderStyles = styled.div``;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      photo {
        image {
          publicUrlTransformed
        }
        altText
      }
      status
      price
    }
  }
`;

const SingleOrderPage = () => {
  console.log('hey');
  return <div>Hey</div>;
};

export default SingleOrderPage;
