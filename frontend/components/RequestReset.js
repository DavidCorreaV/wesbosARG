import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

export const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

const RequestReset = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: 'Email',
  });

  const [signup, { data, error, loading }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: {
        email: inputs.email,
      },
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

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
      <h2>Forgot your password?</h2>

      <DisplayError error={data?.errors || error} />

      <fieldset disabled={loading} aria-busy={loading}>
        {data?.sendUserPasswordResetLink === null && (
          <p>Reset link successfully sent. Please check your inbox.</p>
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

        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
};
export default RequestReset;
