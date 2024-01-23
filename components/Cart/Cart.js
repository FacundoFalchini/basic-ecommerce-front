import React, { useContext, useState, useEffect } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Card from "../UI/Card";
import Link from "next/link";
import classes from "./Cart.module.css";
import Loader from "../UI/loader";
import Checkout from "./Checkout";
import ProductsFooter from "../footers/ProductsFooter";
import StartingFooter from "../footers/startingFooter";
import OptionsBar from "../navigation/optionsBar/OptionsBar";
import Language from "../navigation/language/language";
import logo from "../../public/logo.png";
import Image from "next/image";
import SearchBar from "../navigation/searchBar/SearchBar";
import Profile from "../navigation/profile/profile";
import Orders from "../navigation/purchases/purchases";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosCheckbox } from "react-icons/io";

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [errorPurchase, setErrorPurchase] = useState("");
  const [showCheckBox, setShowCheckBox] = useState(false);
  const [showSelect, setShowSelect] = useState(true);
  //Este enfoque no sirvio porque necesito manejar un estado de error para C/U de los CartItem, entonces en lugar de pasarle el error, le pasamos la funcion y la ejecutamos en el hijo (CartItem)
  //const [errorAdd, setErrorAdd] = useState(null);
  //const [errorRemove, setErrorRemove] = useState(null);

  const total = cartCtx.items.reduce(
    (total, product) => total + product.amount,
    0,
  );

  const handleClickCheck = () => {
    setShowCheckBox((prevState) => !prevState);
  };

  const handleClickSelect = () => {
    setShowSelect((prevState) => !prevState);
  };

  //Funcion para el boton (-)

  const cartItemRemoveHandler = async (id) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const token = localStorage.getItem("token");
      //const token = localStorage.getItem("sadasdasd12312");
      const response = await fetch("http://localhost:3000/cartitems/delOne", {
        method: "DELETE",
        body: JSON.stringify({
          productId: id,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

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

      cartCtx.removeItem(id);

      //const responseData = await response.json();
    } catch (error) {
      //Es necesario volverlo a lanzar, asi lo agarramos en el catch del CartItem.
      throw error;
    }
  };

  //Funcion para el boton (+)

  const cartItemAddHandler = async (item) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const token = localStorage.getItem("token");
      //const token = localStorage.getItem("sadasdasd12312");
      const response = await fetch("http://localhost:3000/cartitems/add", {
        method: "POST",
        body: JSON.stringify({
          productId: item.id,
          productName: item.name,
          productPrice: item.price,
          productStock: item.stock,
          quantity: 1,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

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

      cartCtx.addItem({ ...item, amount: 1 });

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      throw error;
    }
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const orderCancelHandler = () => {
    setIsCheckout(false);
  };

  useEffect(() => {
    // Aplica overflow-hidden al body cuando el modal está abierto
    if (isCheckout) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = ""; // Elimina overflow-hidden cuando el modal se cierra
    }

    // Limpia el efecto al desmontar el componente
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCheckout]);

  //Pasamos la data desde el checkout a Cart, desde este metodo. Es decir, subimos la data del hijo al padre.

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    //Y aca mandamos la request al backend. Donde queremos mandar tanto la userData con la info del carrito.
    //Aca podria igualarlo a response para agregar error handling. Si no lo hacemos asumimos que siempre sale bien
    try {
      const token = localStorage.getItem("token");
      //const token = localStorage.getItem("sadasdasd12312");
      const response = await fetch("http://localhost:3000/carts/purchase", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        const errorMsg =
          responseData.message ||
          (responseData.errors &&
          responseData.errors[0] &&
          responseData.errors[0].message
            ? responseData.errors[0].message
            : "Something went wrong!");
        setIsSubmitting(false);
        throw new Error(errorMsg);
      }

      const responseData = await response.json();

      setIsSubmitting(false);
      setDidSubmit(true);
      //Una vez que todo sale bien, limpiamos el carro (y el cart en la base de datos lo limpia la request)
      cartCtx.clearCart();
      console.log(responseData.message);
    } catch (error) {
      setErrorPurchase(error);
      //alert(error.message);
    }
  };

  //Funcion para el boton de eliminar

  const cartItemDeleteHandler = async (id) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const token = localStorage.getItem("token");
      //const token = localStorage.getItem("sadasdasd12312");
      const response = await fetch("http://localhost:3000/cartitems/del", {
        method: "DELETE",
        body: JSON.stringify({
          productId: id,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

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

      cartCtx.deleteItem(id);

      //const responseData = await response.json();
    } catch (error) {
      //Es necesario volverlo a lanzar, asi lo agarramos en el catch del CartItem.
      throw error;
    }
  };

  if (cartCtx.isLoading) {
    return (
      <div className={classes.loadercontainer}>
        <Loader></Loader>
      </div>
    );
  }

  /*
            <Link href="/" className={classes.motionbutton}>
              Back
            </Link>
*/

  /*
<div className="flex min-h-16 w-full items-center bg-navColor">
<div className=" ml-4 flex  min-h-[58px] w-auto min-w-[66px] items-center justify-center   rounded-sm border border-transparent hover:border-white">
  <Image src={logo} alt="cart" width={40} height={40} />
</div>
<SearchBar></SearchBar>
<Language></Language>
<Profile></Profile>
<Orders></Orders>
<Cart></Cart>
</div>
<OptionsBar></OptionsBar>
*/

  if (!hasItems && !didSubmit) {
    return (
      <div className=" min-w-[1200px]  bg-white">
        <div className="flex min-h-16 w-full items-center bg-navColor">
          <Link href="/">
            <div className=" ml-4 flex  min-h-[58px] w-auto min-w-[66px] items-center justify-center   rounded-sm border border-transparent hover:border-white">
              <Image src={logo} alt="cart" width={40} height={40} />
            </div>
          </Link>
          <SearchBar></SearchBar>
          <Language></Language>
          <Profile></Profile>
          <Orders></Orders>
          <Link href="/cart">
            <div className=" mr-4 flex  min-h-[58px] w-auto min-w-[66px]  items-center   justify-center rounded-sm border border-transparent leading-none hover:border-white ">
              <div className="flex flex-col items-center pb-2">
                <p className="rounded-full font-bold text-[#F08804]">{total}</p>
                <FaShoppingCart className="text-[25px] text-white"></FaShoppingCart>
              </div>
              <div className="flex h-[58px] items-end pb-3 font-sans text-[14px] text-white">
                <p>Cart</p>
              </div>
            </div>
          </Link>
        </div>
        <OptionsBar></OptionsBar>

        <div className="flex w-full min-w-[998px]  bg-[#EAEDED] px-[18px]  pb-[18px] pt-[14px] ">
          <div className="w-auto grow">
            <div className="mb-[20px] ml-[110px] max-w-[1120px] bg-white px-[20px]  pb-[35px] pt-[20px] font-sans">
              <h1 className="mb-[4px] mt-[12px]  font-sans text-[28px] font-normal leading-[36px] text-[#0F1111]">
                Your Site Cart is empty.
              </h1>
              <p className="text-[14px] leading-[20px] ">
                Your Shopping Cart lives to serve. Give it purpose - fill it
                with groceries, clothing, household supplies, electronics, and
                more. <br />
                Continue shopping on the{" "}
                <Link
                  className="cursor-pointer  text-[#007185] hover:text-[#C45500] hover:underline"
                  href="/"
                >
                  Site.com homepage
                </Link>
                , learn about{" "}
                <a className="cursor-pointer  text-[#007185] hover:text-[#C45500] hover:underline">
                  today&apos;s deals
                </a>
                , or visit your{" "}
                <a className="cursor-pointer  text-[#007185] hover:text-[#C45500] hover:underline">
                  Wish List
                </a>
              </p>
            </div>
            <div className="mb-[20px] ml-[110px] max-w-[1120px] bg-white px-[20px] pb-[20px] pt-[20px] font-sans ">
              <h2 className="pb-[4px] font-sans text-[24px] font-bold leading-8 text-[#0F1111] ">
                Your items
              </h2>
              <div>
                <ul className="  ml-[18px] flex cursor-pointer  space-x-[10px] text-sm leading-5 text-[#007185] ">
                  <li className="px-[10px] py-[5px] ">
                    No items saved for later
                  </li>

                  <li className="cursor-auto border-b-2 border-b-[#e47911] px-[10px] py-[5px] font-bold text-[#0F1111]  ">
                    But it again
                  </li>
                </ul>
                <div className=" h-[1px] w-full bg-[#DDD]"></div>
              </div>
              <div className="text-[14px] font-[635px] leading-5">
                No items to buy again.
              </div>
            </div>

            <div className="ml-[110px] max-w-[1120px] font-sans text-[12px] text-[#0F1111]">
              <p>
                The price and availability of items at Site.com are subject to
                change. The Cart is a temporary place to store a list of your
                items and reflects each item&apos;s most recent price.
                <a className="cursor-pointer pl-1 text-[#007185] hover:text-[#C45500] hover:underline">
                  Learn more
                </a>
              </p>
              <p>
                Do you have a gift card or promotional code? We&apos;ll ask you
                to enter your claim code when it&apos;s time to pay.
              </p>
            </div>
          </div>
        </div>
        <div className="h-[20px] w-full bg-white"></div>
        <ProductsFooter></ProductsFooter>
        <StartingFooter></StartingFooter>
      </div>
    );
  }

  //En caso de que el fetch que hace el context de error, renderizamos el error.
  if (cartCtx.error) {
    return (
      <Card>
        <div className={classes.cartcontainer}>
          <div className={classes.errortext}>Error: {cartCtx.error}</div>
          <div className={classes.buttonitem}>
            <Link href="/" className={classes.motionbutton}>
              Back
            </Link>
          </div>
        </div>
      </Card>
    );
  }

  //Si no hay error, recien ahi mandamos a mapear los items del contexto en cartItem.

  const cartItems = cartCtx.items.map((item) => {
    return (
      <CartItem
        key={item.id}
        name={item.name}
        amount={item.amount}
        price={item.price}
        stock={item.stock}
        onRemove={cartItemRemoveHandler.bind(null, item.id)}
        onDelete={cartItemDeleteHandler.bind(null, item.id)}
        onAdd={cartItemAddHandler.bind(null, item)}
      >
        {item.name}
      </CartItem>
    );
  });

  //Boton de back y ordenar. Se renderizan solo si no se tooc el boton de ordenar.
  const cartActions = (
    <div className={classes.cartcontainer}>
      <div className={classes.buttonitem}>
        <Link href="/" className={classes.motionbutton}>
          Back
        </Link>
        {hasItems && (
          <button className={classes.motionbutton} onClick={orderHandler}>
            Order
          </button>
        )}
      </div>
    </div>
  );

  const isSubmittingContent = (
    <div className={classes.loadercontainer}>
      <Loader></Loader>
    </div>
  );

  const didSubmitContent = (
    <Card>
      <div className={classes.noitemstext}>Successfuly sent the order!</div>
      {cartActions}
    </Card>
  );

  const didFailSubmitContent = (
    <Card>
      <div className={classes.noitemstext}>Purchase order shipment failed!</div>
      {errorPurchase.message && (
        <div className={classes.noitemstext}>{errorPurchase.message}</div>
      )}
      <div className={classes.cartcontainer}>
        <div className={classes.buttonitem}>
          <Link href="/" className={classes.motionbutton}>
            Back
          </Link>
        </div>
      </div>
    </Card>
  );

  const cartContent = (
    /*
    <React.Fragment>
      <Card>
        {cartItems}

        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>

        {isCheckout && (
          <Checkout
            onConfirm={submitOrderHandler}
            onCancel={orderCancelHandler}
          ></Checkout>
        )}
        {!isCheckout && cartActions}
      </Card>
    </React.Fragment>
    */

    <div className=" min-w-[1200px]  bg-white ">
      <div className="flex min-h-16 w-full items-center bg-navColor">
        <Link href="/">
          <div className=" ml-4 flex  min-h-[58px] w-auto min-w-[66px] items-center justify-center   rounded-sm border border-transparent hover:border-white">
            <Image src={logo} alt="cart" width={40} height={40} />
          </div>
        </Link>
        <SearchBar></SearchBar>
        <Language></Language>
        <Profile></Profile>
        <Orders></Orders>
        <Link href="/cart">
          <div className=" mr-4 flex  min-h-[58px] w-auto min-w-[66px]  items-center   justify-center rounded-sm border border-transparent leading-none hover:border-white ">
            <div className="flex flex-col items-center pb-2">
              <p className="rounded-full font-bold text-[#F08804]">{total}</p>
              <FaShoppingCart className="text-[25px] text-white"></FaShoppingCart>
            </div>
            <div className="flex h-[58px] items-end pb-3 font-sans text-[14px] text-white">
              <p>Cart</p>
            </div>
          </div>
        </Link>
      </div>
      <OptionsBar></OptionsBar>

      <div className="flex w-full min-w-[998px]   bg-[#EAEDED]  px-[18px] pb-[18px] pt-[14px]">
        <div className="mx-auto flex w-auto basis-[80%] justify-center">
          <div className="w-auto basis-[80%]">
            <div className="mb-[20px]   bg-white px-[20px]  pb-[35px] pt-[20px] font-sans">
              <h1 className="font-sans text-[28px] text-[#0F1111]">
                Shopping Cart
              </h1>
              <div
                className="w-[110px] cursor-pointer font-sans text-[14px] text-[#007185] hover:text-[#C45500] hover:underline"
                onClick={handleClickSelect}
              >
                {showSelect && "Select all items"}
                {!showSelect && "Deselect all items"}
              </div>
              <div className="flex justify-end border-b border-b-[#DDD] font-sans text-[14px] text-[#565959]">
                Price
              </div>

              <div className=" pb-[2px] pl-[12px] pt-[12px]">{cartItems}</div>
              <div className="flex w-full justify-end text-[18px] text-[#0F1111] ">
                <span className="font-[499]">
                  Subtotal ({cartCtx.items.length} items):
                </span>
                <span className="pl-1 font-bold  ">{totalAmount}</span>
              </div>
            </div>
            <div className="mb-[20px] bg-white px-[20px] pb-[20px] pt-[20px] font-sans ">
              <h2 className="pb-[4px] font-sans text-[24px] font-bold leading-8 text-[#0F1111] ">
                Your items
              </h2>
              <div>
                <ul className="  ml-[18px] flex cursor-pointer  space-x-[10px] text-sm leading-5 text-[#007185] ">
                  <li className="px-[10px] py-[5px] ">
                    No items saved for later
                  </li>

                  <li className="cursor-auto border-b-2 border-b-[#e47911] px-[10px] py-[5px] font-bold text-[#0F1111]  ">
                    But it again
                  </li>
                </ul>
                <div className=" h-[1px] w-full bg-[#DDD]"></div>
              </div>
              <div className="text-[14px] font-[635px] leading-5">
                No items to buy again.
              </div>
            </div>

            <div className=" font-sans text-[12px] text-[#0F1111]">
              <p>
                The price and availability of items at Site.com are subject to
                change. The Cart is a temporary place to store a list of your
                items and reflects each item&apos;s most recent price.
                <a className="cursor-pointer pl-1 text-[#007185] hover:text-[#C45500] hover:underline">
                  Learn more
                </a>
              </p>
              <p>
                Do you have a gift card or promotional code? We&apos;ll ask you
                to enter your claim code when it&apos;s time to pay.
              </p>
            </div>
          </div>
          <div className="mb-[20px] ml-5 h-[145px] bg-white pb-[15px] pt-[20px]">
            <div className="px-[20px] pb-[5px]">
              <form className="mb-[14px] w-[260px] font-sans text-[18px] leading-6 text-[#0F1111]">
                <div className="mb-[4px] w-full">
                  <span className="font-[499]">
                    Subtotal ({cartCtx.items.length} items):
                  </span>
                  <span className="pl-1 font-bold  ">{totalAmount}</span>
                </div>
                <div className="relative mb-[12px] flex  items-center text-[#0F1111]">
                  <div
                    className=" absolute h-[13px] w-[13px] rounded-sm border border-[#CCCCCC] "
                    onClick={handleClickCheck}
                  ></div>
                  {showCheckBox && (
                    <IoIosCheckbox
                      className=" absolute left-[-2px]  text-[17px] text-[#0075ff]"
                      onClick={handleClickCheck}
                    ></IoIosCheckbox>
                  )}

                  <p className="ml-3 pl-[5px] text-[14px]">
                    This order contains a gift
                  </p>
                </div>

                <button
                  className="flex h-[29px] w-full items-center justify-center rounded-[7px] bg-yellowButton text-[13px]  text-[#0F1111] 	
                ring-borderRingLogin ring-opacity-100 hover:bg-yellowButtonHover focus:border focus:border-borderLogin focus:outline-none focus:ring"
                  onClick={orderHandler}
                  type="button"
                >
                  Proceed to checkout
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[20px] w-full bg-white"></div>
      <ProductsFooter></ProductsFooter>
      <StartingFooter></StartingFooter>

      {isCheckout && (
        <Checkout
          onConfirm={submitOrderHandler}
          onCancel={orderCancelHandler}
        ></Checkout>
      )}
    </div>
  );

  return (
    <React.Fragment>
      {!isSubmitting && !didSubmit && !errorPurchase && cartContent}
      {isSubmitting && isSubmittingContent}
      {!isSubmitting && didSubmit && didSubmitContent}
      {!isSubmitting && !didSubmit && errorPurchase && didFailSubmitContent}
    </React.Fragment>
  );
};

export default Cart;

/*
 <div className="flex min-h-16 w-full items-center bg-navColor">
        <div className=" ml-4 flex  min-h-[58px] w-auto min-w-[66px] items-center justify-center   rounded-sm border border-transparent hover:border-white">
          <Image src={logo} alt="cart" width={40} height={40} />
        </div>
        <SearchBar></SearchBar>
        <Language></Language>
        <Profile></Profile>
        <Orders></Orders>
        <Link href="/cart">
          <div className=" mr-4 flex  min-h-[58px] w-auto min-w-[66px]  items-center   justify-center rounded-sm border border-transparent leading-none hover:border-white ">
            <div className="flex flex-col items-center pb-2">
              <p className="rounded-full font-bold text-[#F08804]">{total}</p>
              <FaShoppingCart className="text-[25px] text-white"></FaShoppingCart>
            </div>
            <div className="flex h-[58px] items-end pb-3 font-sans text-[14px] text-white">
              <p>Cart</p>
            </div>
          </div>
        </Link>
      </div>
      <OptionsBar></OptionsBar>

      <div className="flex w-full min-w-[998px]  bg-[#EAEDED] px-[18px]  pb-[18px] pt-[14px] ">
        <div className="mx-auto flex w-auto basis-[80%] justify-center">
          <div className="w-auto basis-[80%]">
            <div className="mb-[20px]   bg-white px-[20px]  pb-[35px] pt-[20px] font-sans">
              <h1 className="font-sans text-[28px] text-[#0F1111]">
                Shopping Cart
              </h1>
              <div
                className="w-[110px] cursor-pointer font-sans text-[14px] text-[#007185] hover:text-[#C45500] hover:underline"
                onClick={handleClickSelect}
              >
                {showSelect && "Select all items"}
                {!showSelect && "Deselect all items"}
              </div>
              <div className="flex justify-end border-b border-b-[#DDD] font-sans text-[14px] text-[#565959]">
                Price
              </div>

              <div className=" pb-[2px] pl-[12px] pt-[12px]">{cartItems}</div>
              <div className="flex w-full justify-end text-[18px] text-[#0F1111] ">
                <span className="font-[499]">
                  Subtotal ({cartCtx.items.length} items):
                </span>
                <span className="pl-1 font-bold  ">{totalAmount}</span>
              </div>
            </div>
            <div className="mb-[20px] bg-white px-[20px] pb-[20px] pt-[20px] font-sans ">
              <h2 className="pb-[4px] font-sans text-[24px] font-bold leading-8 text-[#0F1111] ">
                Your items
              </h2>
              <div>
                <ul className="  ml-[18px] flex cursor-pointer  space-x-[10px] text-sm leading-5 text-[#007185] ">
                  <li className="px-[10px] py-[5px] ">
                    No items saved for later
                  </li>

                  <li className="cursor-auto border-b-2 border-b-[#e47911] px-[10px] py-[5px] font-bold text-[#0F1111]  ">
                    But it again
                  </li>
                </ul>
                <div className=" h-[1px] w-full bg-[#DDD]"></div>
              </div>
              <div className="text-[14px] font-[635px] leading-5">
                No items to buy again.
              </div>
            </div>

            <div className=" font-sans text-[12px] text-[#0F1111]">
              <p>
                The price and availability of items at Site.com are subject to
                change. The Cart is a temporary place to store a list of your
                items and reflects each item&apos;s most recent price.
                <a className="cursor-pointer pl-1 text-[#007185] hover:text-[#C45500] hover:underline">
                  Learn more
                </a>
              </p>
              <p>
                Do you have a gift card or promotional code? We&apos;ll ask you
                to enter your claim code when it&apos;s time to pay.
              </p>
            </div>
          </div>
          <div className="mb-[20px] ml-5 h-[145px] bg-white pb-[15px] pt-[20px]">
            <div className="px-[20px] pb-[5px]">
              <form className="mb-[14px] w-[260px] font-sans text-[18px] leading-6 text-[#0F1111]">
                <div className="mb-[4px] w-full">
                  <span className="font-[499]">
                    Subtotal ({cartCtx.items.length} items):
                  </span>
                  <span className="pl-1 font-bold  ">{totalAmount}</span>
                </div>
                <div className="relative mb-[12px] flex  items-center text-[#0F1111]">
                  <div
                    className=" absolute h-[13px] w-[13px] rounded-sm border border-[#CCCCCC] "
                    onClick={handleClickCheck}
                  ></div>
                  {showCheckBox && (
                    <IoIosCheckbox
                      className=" absolute left-[-2px]  text-[17px] text-[#0075ff]"
                      onClick={handleClickCheck}
                    ></IoIosCheckbox>
                  )}

                  <p className="ml-3 pl-[5px] text-[14px]">
                    This order contains a gift
                  </p>
                </div>

                <button
                  className="flex h-[29px] w-full items-center justify-center rounded-[7px] bg-yellowButton text-[13px]  text-[#0F1111] 	
                ring-borderRingLogin ring-opacity-100 hover:bg-yellowButtonHover focus:border focus:border-borderLogin focus:outline-none focus:ring"
                >
                  Proceed to checkout
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[20px] w-full bg-white"></div>
      <ProductsFooter></ProductsFooter>
      <StartingFooter></StartingFooter>

*/
