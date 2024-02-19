import { useReducer, useEffect, useContext, useState } from "react"; //State mas complejo, entonces useReducer > useState
import CartContext from "./cart-context";
import AuthContext from "./auth-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
  isLoading: false,
  error: null,
};

//Funcion que hace el fetch del cart del usuario. Fuera del componente, porque no usa data del componente y asi no se recrea.
const fetchCartData = async () => {
  try {
    const token = localStorage.getItem("token");
    //const token = localStorage.getItem("sadasdasd12312");
    const response = await fetch(
      "http://localhost:3000/cartItems/getCartElements",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      const responseData = await response.json();
      const errorMsg =
        responseData.message ||
        (responseData.errors &&
        responseData.errors[0] &&
        responseData.errors[0].message
          ? responseData.errors[0].message
          : "Something went wrong!");
      throw new Error(errorMsg);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

//State es el ultimo estado manejado.
//Action es determinada por nosotros.
//La funcion retorna el nuevo y ultimo estado. Retornamos el default, y luego en la funcion componente, usamos useReducer. Se le pasa la funcion reducer y el estado inicial.

const cartReducer = (state, action) => {
  if (action.type === "LOAD_CART") {
    return {
      items: action.cart.items,
      totalAmount: action.cart.totalAmount,
    };
  }

  if (action.type === "SET_ERROR") {
    return {
      ...state,
      error: action.error,
    };
  }

  //Este es para agregar un elemento al carrito, hace la verificacion de que si ya existe o no.
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id,
    );

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  //Este es para eliminar del carrito, hace la verificacion de si es la ultima unidad o no.
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id,
    );

    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;

    let updatedItems;

    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  //Este es para eliminar de una de carrito
  if (action.type === "DELETE") {
    const updatedItems = state.items.filter((item) => item.id !== action.id);

    const existingCartItem = state.items.find((item) => item.id === action.id);
    const updatedTotalAmount =
      state.totalAmount - existingCartItem.price * existingCartItem.amount;

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return defaultCartState;
  }

  return defaultCartState;
};

//Esto es lo que retornamos.
const CartProvider = (props) => {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  //Al reducer se le pasa, el estado actual y las diferentes acciones.
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState,
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const deleteItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "DELETE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      try {
        const cartData = await fetchCartData();
        //console.log(cartData);

        if (cartData) {
          // Aquí asumimos que cartData tiene la estructura correcta para tu contexto
          const productsFormat = cartData.map((item) => {
            return {
              id: item.productId,
              name: item.productName,
              price: item.productPrice,
              stock: item.productStock,
              amount: item.quantity,
              imageUrl: item.productImageUrl,
            };
          });

          const totalAmount = cartData.reduce((accumulator, item) => {
            return accumulator + item.productPrice * item.quantity;
          }, 0);

          dispatchCartAction({
            type: "LOAD_CART",
            cart: { items: productsFormat, totalAmount: totalAmount },
          });
        }
      } catch (error) {
        dispatchCartAction({ type: "SET_ERROR", error: error.message });
      } finally {
        setLoading(false);
      }
    };

    //Haciendo asi, logro que el contexto del carrito este siempre en sintonia con la auntentificacion del usuario. Cuando este inicia, se hace igual a lo q esta en su backend y cuando sale se borra.
    if (token) {
      loadCart();
    } else {
      dispatchCartAction({ type: "CLEAR" });
    }
  }, [token]);

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    isLoading: loading,
    error: cartState.error,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    deleteItem: deleteItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  //El JSX que retornamos, es el Context provider, donde:
  //1) Le pasamos el children, lo que nos permite es envolver cualquier componente que deberia tener acceso al contexto.
  //2) Y tambien toda la logica de manejo del contexto se va a agregar aca.
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
