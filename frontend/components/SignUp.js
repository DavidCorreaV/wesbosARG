import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useState } from 'react';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      name
      email
    }
  }
`;

const SignUp = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: 'Email',
    name: 'Name',
    password: '',
  });

  const [signup, { data, error, loading }] = useMutation(SIGNUP_MUTATION, {
    variables: {
      email: inputs.email,
      password: inputs.password,
      name: inputs.name,
    },
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  // const [errorMessage, setErrorMessage] = useState({});
  if (data?.createUser) {
    return <p>Signed up with {data?.createUser.email}. Please Sign In.</p>;
  }

  return (
    <Form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await signup().catch((err) => {
          // setErrorMessage(err);
          console.log(err);
        });
        resetForm();
      }}
    >
      <h2>Sign up for an account</h2>

      <DisplayError error={data?.errors || error} />

      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="email">
          email
          <input
            type="email"
            id="signEmail"
            name="email"
            placeholder="your email"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="signName"
            name="name"
            placeholder="Your Name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            id="signPassword"
            name="password"
            placeholder="Password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign In !</button>
      </fieldset>
    </Form>
  );
};
export default SignUp;
