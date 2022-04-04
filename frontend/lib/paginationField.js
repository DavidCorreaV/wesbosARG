import { PAGINATION_QUERY } from '../components/Pagination';

const paginationField = () => ({
  keyArgs: false,
  read(existing = [], { args, cache }) {
    const { skip, first } = args;
    const data = cache.readQuery({ query: PAGINATION_QUERY });
    const count = data?._allProductsMeta?.count;
    const page = skip / first + 1;
    const pages = Math.ceil(count / first);

    const items = existing.slice(skip, skip + first).filter((x) => x);
    if (items.length && items.length !== first && page === pages) {
      return items;
    }
    if (items.length !== first) {
      // we must fetch from network, hence
      return false;
    }

    if (items.length) {
      // console.log('Found items. Sending to apollo...');
      return items;
    }

    // If everything else fails, fetch from network, hence:
    return false;
  },
  merge(existing, incoming, { args }) {
    // This is kinda hacky but wes says it's ok
    const { skip, first } = args;
    const merged = existing ? existing.slice(0) : [];
    // eslint-disable-next-line no-plusplus
    for (let i = skip; i < skip + incoming.length; ++i) {
      merged[i] = incoming[i - skip];
    }
    // console.log(merged);
    return merged;
  },
});
export default paginationField;
