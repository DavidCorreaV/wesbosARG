import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles';
import DisplayError from './ErrorMessage';
import { perPage } from '../config';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

const productsPerPage = perPage;

// eslint-disable-next-line react/prop-types
const Pagination = ({ page }) => {
  const { error, loading, data } = useQuery(PAGINATION_QUERY);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <DisplayError error={error} />;
  }
  const totalPages = Math.ceil(data._allProductsMeta.count / productsPerPage);
  return (
    <PaginationStyles>
      <Head>
        <title>
          Sick Fits - Page {page} of {totalPages}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={loading || page === 1}>🡨 Prev</a>
      </Link>
      <p>
        Page {page} of {totalPages}
      </p>
      <p> {data._allProductsMeta.count} Items Total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={loading || page === totalPages}>Next 🡪</a>
      </Link>
    </PaginationStyles>
  );
};
export default Pagination;
