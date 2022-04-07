/* eslint-disable react/jsx-props-no-spreading */

import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const Search = () => {
  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  );
  const items = data?.searchTerms || [];
  console.log(loading);
  console.log(error);
  console.log(data);
  const findItemsButChill = debounce(findItems, 300);
  resetIdCounter();
  const { inputValue, getMenuProps, getInputProps, getComboboxProps } =
    useCombobox({
      items: [''],
      onInputValueChange() {
        findItemsButChill({ variables: { searchTerm: inputValue } });
      },
      onSelectedItemChange() {
        console.log('oh my');
      },
    });

  return (
    <SearchStyles>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search',
            id: 'search',
            className: 'loading',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {items.map((item) => (
          <DropDownItem key={item.id}>{item.name}</DropDownItem>
        ))}
      </DropDown>
    </SearchStyles>
  );
};
export default Search;
