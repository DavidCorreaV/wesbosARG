import { useMutation } from '@apollo/client';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import gql from 'graphql-tag';
import { useRouter } from 'next/dist/client/router';
import nProgress from 'nprogress';
import { element } from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import SickButton from './styles/SickButton';
import { useCart } from '../lib/cartState';
import CURRENT_USER_QUERY from './User';

const CheckoutFormsStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;
const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;
const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const CheckoutForm = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [checkout, { error: graphQLError }] = useMutation(
    CREATE_ORDER_MUTATION,
    { refetchQueries: [{ query: CURRENT_USER_QUERY }] }
  );
  const { closeCart } = useCart();
  async function handleSubmit(e) {
    // Stop the submit and put on a loader
    e.preventDefault();
    setLoading(true);
    // Start transition
    nProgress.start();
    // Create payment method via stripe
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    console.log(CardElement);
    console.log(paymentMethod);
    // Handle any errors from stripe
    if (error) {
      setError(error);
      nProgress.done();
      return; // Stops checkout process
    }
    // Send token from stripe obtained in last step to ks server via a custom mutation
    const order = await checkout({ variables: { token: paymentMethod.id } });
    console.log('Order received');
    console.log(order);
    // change page to view the order
    router.push({
      pathname: '/order/[id]',
      query: { id: order.data.checkout.id },
    });
    // Close the Cart
    closeCart();
    // turn loader off
    setLoading(false);
    nProgress.done();
  }
  return (
    // eslint-disable-next-line react/jsx-no-bind
    <CheckoutFormsStyles onSubmit={handleSubmit}>
      {error && (
        <p style={{ fontSize: '2rem' }}>
          Oops. Something went wrong. {error.message}
        </p>
      )}{' '}
      {graphQLError && (
        <p style={{ fontSize: '2rem' }}>
          Oops. Something went wrong. {graphQLError.message}
        </p>
      )}
      <CardElement />
      <SickButton>Check Out Now!</SickButton>
    </CheckoutFormsStyles>
  );
};

function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}

export default Checkout;
