import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

const resetPage = ({ query }) => {
  console.log(query.token);
  if (!query?.token) {
    return (
      <div>
        <p>
          Sorry, we were expecting a token, but you can try again. If you don't
          have one, you can get one here
        </p>
        <RequestReset />
      </div>
    );
  }
  return (
    <>
      <Reset token={query.token} />
    </>
  );
};
export default resetPage;
