import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput } from '../.keystone/schema-types';
import { Session } from '../types';

const addToCart = async (
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> => {
  const session = context.session as Session;
  if (!session.itemId) {
    throw new Error('You must be logged in to add to cart');
  }

  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: session.itemId }, product: { id: productId } },
    resolveFields: 'id, quantity',
  });

  const [existingItem] = allCartItems;
  if (existingItem) {
    console.log(
      `${existingItem.quantity} Items already present, increment by one`
    );

    return await context.lists.CartItem.updateOne({
      id: existingItem.id,
      data: { quantity: existingItem.quantity + 1 },
    });
  }
  if (!existingItem) {
    return await context.lists.CartItem.createOne({
      data: {
        product: { connect: { id: productId } },
        user: { connect: { id: session.itemId } },
      },
    });
  }
};
export default addToCart;
