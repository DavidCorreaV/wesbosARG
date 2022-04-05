import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: `type Mutation {
       addToCart(productId: ID): CartItem
  }`,
  resolvers: {
    Mutation: {
      addToCart() {
        console.log('ADD TO CART!!');
      },
    },
  },
});
