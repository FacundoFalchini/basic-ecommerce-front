//Este componente es para:
//1) Manejar el contexto actual del Cart y su data.
//2) Proveer el contexto a todos los componentes que quieran acceso a el.

//Para manejar el estado, podemos usar el useReducer o UseState, pero como el estado es un poco mas complejo, es mejor usar Reducer.
import { useReducer, useEffect, useContext } from "react";
import CartContext from "./cart-context";
import AuthContext from "./auth-context";

//La funcion esta fuera del componente, porque no usa data del componente y ende no deberia ser recreada cada vez que cambia algo del componente.
//State es el ultimo estado manejado, y la action es determinada por nosotros. Y la funcion retorna el nuevo y ultimo estado. Retornamos el default, y luego en la funcion componente, usamos useReducer. Se le pasa la funcion reducer y el estado inicial.

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const fetchCartData = async () => {
  try {
    const token = localStorage.getItem("token");
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
    console.error(error);
    // Maneja el error según sea necesario
  }
};

const cartReducer = (state, action) => {
  if (action.type === "LOAD_CART") {
    return {
      items: action.cart.items,
      totalAmount: action.cart.totalAmount,
    };
  }

  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    //Si ya existe el id, (el elemento) en el carrito, nos retorna el indice
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id,
    );
    //Obtenemos el elemento existente. Esto solo funciona si existe, y sino dara null.
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      //Agarro el arreglo viejo
      updatedItems = [...state.items];
      //Y sobreescribo el elemento
      updatedItems[existingCartItemIndex] = updatedItem;
      //Y SI NO EXISTE:
    } else {
      //concat crea un nuevo arreglo, no queremos modificar el anterior como pasaria si usamos push.
      updatedItems = state.items.concat(action.item);
    }

    //Y se retorna el nuevo estado que toma los valores de ariba.
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id,
    );

    const existingCartItem = state.items[existingCartItemIndex];

    const updatedTotalAmount = state.totalAmount - existingCartItem.price;

    let updatedItems;
    //Si la cantidad del elemento a quitar es 1, se elimina el elemento porque ya no quedan mas.
    if (existingCartItem.amount === 1) {
      //Aca nos quedamos con todos los items que no son el que queda en 0.
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      //Aca no queremos quitar el elemento, sino actualizar la cantidad
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

  if (action.type === "CLEAR") {
    return defaultCartState;
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const { token } = useContext(AuthContext);
  //El JSX que retornamos, es el Context provider, donde:
  //1) Le pasamos el children, lo que nos permite es werap cualquier componente que deberia tener acceso al contexto.
  //2) Y tambien toda la logica de manejo del contexto se va a agregar aca.

  //Primero: estadoactual, funcion que permite dar una accion al reducer.
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState,
  );

  const addItemToCartHandler = (item) => {
    //La accion es lo que querramos, pero en general es un objeto que tenga algun ID para identificar dicha accion. A su vez, al reducer le pasamos el item.
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  useEffect(() => {
    const loadCart = async () => {
      const cartData = await fetchCartData();

      if (cartData) {
        // Aquí asumimos que cartData tiene la estructura correcta para tu contexto
        const productsFormat = cartData.map((item) => {
          return {
            id: item.productId,
            name: item.productName,
            price: item.productPrice,
            amount: item.quantity,
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
    };

    //Haciendo asi, logro que el contexto del carrito este siempre en sintonia con la auntentificacion del usuario. Cuando este inicia, se hace igual a lo q esta en su backend y cuando sale se borra.
    if (token) {
      loadCart();
    }
  }, [token]);

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
