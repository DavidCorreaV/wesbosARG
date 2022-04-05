const calcTotalCart = (cart) =>
  cart.reduce((total, item) => {
    if (!item.product) {
      return total;
    }
    return total + (item.product.price * item.quantity) / 100;
  }, 0);

export default calcTotalCart;
