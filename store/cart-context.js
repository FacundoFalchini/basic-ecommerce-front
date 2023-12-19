import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  isLoading: false,
  error: null,
  addItem: (item) => {},
  removeItem: (id) => {},
  deleteItem: (id) => {},
  clearCart: () => {},
});

export default CartContext;
