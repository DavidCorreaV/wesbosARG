import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    endSession
  }
`;

const SignOut = () => {
  const [endSession] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const onClick = async (e) => {
    e.preventDefault();
    await endSession();
  };

  return (
    <button type="button" onClick={onClick}>
      SignOut
    </button>
  );
};
export default SignOut;
