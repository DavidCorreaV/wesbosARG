import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

const SignIn = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: 'Email',
    password: '',
  });

  const [signin, { data, error, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: {
      email: inputs.email,
      password: inputs.password,
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <Form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        await signin();
        resetForm();
      }}
    >
      <h2>Sign into your account</h2>

      <DisplayError error={data?.authenticateUserWithPassword} />

      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="email">
          Email
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Your Email"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
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
export default SignIn;
