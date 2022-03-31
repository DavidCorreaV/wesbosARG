import { useRouter } from 'next/dist/client/router';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

const ProductsPage = () => {
  const { page } = useRouter().query;
  const pageNumber = parseInt(page, 10);
  return (
    <>
      <Pagination page={pageNumber || 1} />
      <Products page={pageNumber || 1} />
      <Pagination page={pageNumber || 1} />
    </>
  );
};
export default ProductsPage;
