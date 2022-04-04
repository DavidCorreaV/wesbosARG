import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      password: $password
      token: $token
    ) {
      code
      message
    }
  }
`;

// eslint-disable-next-line react/prop-types
const Reset = ({ token }) => {
  const { inputs, handleChange, resetForm } = useForm({
    email: 'Email',
    password: '',
    token: '',
  });

  const [reset, { data, error, loading }] = useMutation(RESET_MUTATION, {
    variables: {
      email: inputs.email,
      password: inputs.password,
      token,
    },
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <Form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await reset().catch((err) => {
          // setErrorMessage(err);
          console.log(err);
        });
        resetForm();
      }}
    >
      <h2>Reset your password</h2>

      <DisplayError error={data?.redeemUserPasswordResetToken || error} />

      <fieldset disabled={loading} aria-busy={loading}>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Succesfully reset your password</p>
        )}
        <label htmlFor="email">
          Email
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

        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
};
export default Reset;
