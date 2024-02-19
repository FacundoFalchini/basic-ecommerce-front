import ProductsFooter from "../footers/ProductsFooter";
import StartingFooter from "../footers/startingFooter";
import Language from "../navigation/LanguageNav/LanguageNav";
import OptionsBar from "../navigation/optionsBar/OptionsBar";
import ProfileNav from "../navigation/ProfileNav/ProfileNav";
import SearchBar from "../navigation/searchBar/SearchBar";
import Cart from "../navigation/CartNav/CartNav";
import logoSite from "../../public/logoSite.png";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import PurchasesContext from "@/store/purchases-context";
import Loader from "../UI/Loader";
import PurchaseItem from "./PurchaseItem/PurchaseItem";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

function Purchases() {
  const purchasesCtx = useContext(PurchasesContext);
  const [purchases, setPurchases] = useState([]);
  const [dateSelected, setDateSelected] = useState([]);
  const [visibleItems, setVisibleItems] = useState(5);

  //Para q se corra cuandoa penas entramos al componente con el de 30 dias q es la opcion por defecto
  useEffect(() => {
    filterPurchases("1");
  }, [purchasesCtx.isLoading]);
  //Agregue el loading del contexto como dependencia porque sino al hacer F5 el ctx.items estaba vacio y entonces el filterPurchases quedaba vacio.. asi esto se ejecuta apenas cambia a estado que termino de cargar y ya no esta vacio.

  const handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
  };

  const handleChange = (event) => {
    filterPurchases(event.target.value);
    setDateSelected(event.target.value);
    setVisibleItems(5);
  };

  //Funcion que hace los grupos de productos
  const filterPurchases = (date) => {
    if (date === "1") {
      //Los ultimos 30 dias
      const actualDate = new Date();
      const filterItems = purchasesCtx.items.reduce((acum, item) => {
        //Obtengo la fecha de la compra
        const purchaseDate = new Date(item.date);

        //Dif en milissengods
        const diferenceMs = actualDate - purchaseDate;

        //Dif en dias
        const diferenceDays = diferenceMs / (1000 * 60 * 60 * 24);

        //console.log(diferenceDays);

        if (diferenceDays <= 30) {
          acum.push(item);
        }

        return acum;
      }, []);

      setPurchases(filterItems);

      return;
    }

    if (date === "2") {
      //Los ultimos 3 meses
      const actualDate = new Date();
      const filterItems = purchasesCtx.items.reduce((acum, item) => {
        //Obtengo la fecha de la compra
        const purchaseDate = new Date(item.date);

        //Dif en milissengods
        const diferenceMs = actualDate - purchaseDate;

        //Dif en dias
        const diferenceDays = diferenceMs / (1000 * 60 * 60 * 24);

        if (diferenceDays <= 90) {
          acum.push(item);
        }

        return acum;
      }, []);

      setPurchases(filterItems);

      return;
    }

    if (date === "3") {
      //Archivados, no tengo
      setPurchases([]);
      return;
    }

    const filterItems = purchasesCtx.items.reduce((acum, item) => {
      // Extraer el año de la fecha
      const yearDate = new Date(item.date).getFullYear().toString();

      if (yearDate === date) {
        acum.push(item);
      }

      return acum;
    }, []);

    setPurchases(filterItems);
    return;
  };

  const handleShowMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 5);
  };

  //Lo primero es cargar el carrito, donde el contexto manda una request al back y esto puede demorar asique agregamos el spinner.
  if (purchasesCtx.isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <Loader></Loader>
      </div>
    );
  }

  //En caso de que el fetch que hace el context de error, renderizamos el error.
  if (purchasesCtx.error) {
    return (
      <div className=" flex h-screen min-w-[1200px]  flex-col  items-center bg-white">
        <div
          className="mt-20 flex h-20 w-full  max-w-96 rounded-xl border border-red-600 bg-white p-4 ring-4 ring-inset 	
          ring-red-300 ring-opacity-20"
        >
          <HiOutlineExclamationTriangle className="mr-4  align-top text-[30px] text-[#BA0933]"></HiOutlineExclamationTriangle>

          <div className="flex flex-col justify-center    ">
            <h1 className="font-sans  text-lg text-[#BA0933]">
              A problem occurred
            </h1>
            <h2 className="  font-sans text-xs text-blackText">
              {purchasesCtx.error}
            </h2>
          </div>
        </div>
        <Link href="/">
          <div className="mt-[14px] flex h-[29px] items-center rounded-[7px] bg-[#FFD814] px-[10px] py-[1px] font-sans text-[13px] text-[#0F1111] hover:bg-[#f7ca00]">
            Back
          </div>
        </Link>
      </div>
    );
  }

  if (purchases.length === 0) {
    return (
      <div className=" min-w-[1200px]  bg-white">
        <div className="flex h-[55px] w-full items-center space-x-2 bg-navColor">
          <Link href="/">
            <div className=" ml-4 flex h-[45px] w-auto cursor-pointer items-center justify-center   rounded-sm border border-transparent  hover:border-white">
              <Image
                src={logoSite}
                alt="cart"
                width={90}
                height={90}
                className="mt-[13px]"
              />
            </div>
          </Link>
          <SearchBar></SearchBar>
          <Language></Language>
          <ProfileNav></ProfileNav>
          <div className="flex h-[45px]  w-auto cursor-pointer items-center justify-center rounded-sm border border-transparent px-3 hover:border-white ">
            <p className="font-sans text-sm font-semibold text-white">Orders</p>
          </div>
          <Cart></Cart>
        </div>
        <OptionsBar></OptionsBar>

        <section className="text  mx-auto w-[920px] font-sans">
          <div className="flex w-full flex-col">
            <div className="mb-[16px] mt-[8px] flex w-full  items-center text-[14px] ">
              <Link href="/profile">
                <p className="cursor-pointer font-sans text-[#007185] hover:text-[#C45500] hover:underline">
                  Your Account
                </p>
              </Link>
              <IoIosArrowForward className=" mx-1 text-[12px] text-[#555555]"></IoIosArrowForward>
              <p className="font-sans text-[#C45500] ">Your Orders</p>
            </div>
            <div className="mb-[16px] flex w-full justify-between">
              <p className="     text-[#0F text-[28px] font-normal leading-9 text-[#0F1111]">
                Your Orders
              </p>
              <div className="flex w-[50%]">
                <form onSubmit={handleSubmit} className="flex grow">
                  <div className="relative flex grow ">
                    <input
                      type="text"
                      placeholder="Search all orders"
                      className="h-[31px] w-full rounded border border-solid border-[#888C8C] py-[3px] pl-[29px] pr-[7px] font-sans outline-none ring-borderRingLogin placeholder:text-sm placeholder:text-gray-500 focus:border-borderLogin focus:ring"
                    />
                    <div className="pointer-events-none absolute left-2 top-2.5  ">
                      <FaSearch className="text-[13px] leading-5 text-[#0F1111]" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="ml-3 flex  h-[31px] w-auto min-w-11 items-center rounded-[100px] border border-black bg-[#303333] px-2.5  text-center text-[13px] text-sm font-bold leading-5 text-white ring-borderRingLogin  ring-opacity-100 hover:bg-black hover:bg-opacity-100  active:border active:border-borderLogin active:outline-none active:ring

                       
              "
                  >
                    Search Orders
                  </button>
                </form>
              </div>
            </div>
            <div className="mb-[16px]">
              <ul className="  ml-[18px] flex cursor-pointer  space-x-[10px] text-sm leading-5 text-[#007185] ">
                <li className="cursor-auto border-b-2 border-b-[#e47911] px-[10px] py-[5px] font-bold text-[#0F1111]  ">
                  Orders
                </li>

                <li className="px-[10px] py-[5px] hover:text-[#C45500] hover:underline">
                  Buy Again
                </li>
                <li className="px-[10px] py-[5px] hover:text-[#C45500] hover:underline">
                  Not Yet Shipped
                </li>
                <li className="px-[10px] py-[5px] hover:text-[#C45500] hover:underline">
                  Digital Orders
                </li>
                <li className="px-[10px] py-[5px] hover:text-[#C45500] hover:underline">
                  Local Store Orders
                </li>
                <li className="px-[10px] py-[5px] hover:text-[#C45500] hover:underline">
                  Cancelled Orders
                </li>
              </ul>
              <div className=" h-[1px] w-full bg-[#DDD]"></div>
            </div>
            <div className="mb-[16px]">
              <form className="font-sans text-[14px] leading-5 text-[#0f1111]">
                <label className="mr-[3.5px] pb-[2px] pl-[2px]">
                  <strong>
                    {purchases.length === 0 ? 0 : purchases.length} orders
                  </strong>{" "}
                  placed in
                </label>
                <select
                  onChange={handleChange}
                  className="w-[115px] cursor-pointer truncate rounded-[7px] border border-solid border-[#d5d9d9] bg-[#F0F2F2] py-[2px] hover:bg-[#d5d9d9] hover:bg-opacity-60  "
                >
                  <option value={1}>last 30 days</option>
                  <option value={2}>past 3 months</option>
                  <option value={2024}>2024</option>
                  <option value={2023}>2023</option>
                  <option value={2022}>2022</option>
                  <option value={2021}>2021</option>
                  <option value={2020}>2020</option>
                  <option value={2019}>2019</option>
                  <option value={2018}>2018</option>
                  <option value={2017}>2017</option>
                  <option value={2016}>2016</option>
                  <option value={3}>Archived Orders</option>
                </select>
              </form>
            </div>

            {dateSelected === "3" ? (
              <div className="mb-[32px] mt-[24px] flex items-center justify-center text-[14px] leading-5 text-[#0f1111]">
                {" "}
                <p>Looks like you havent archived any order yet.</p>
              </div>
            ) : (
              <div className="mb-[32px] mt-[24px] flex items-center justify-center text-[14px] leading-5 text-[#0f1111]">
                {" "}
                <p>
                  Looks like you havent placed an order in this period of time.
                </p>
                <p className="cursor-pointer pl-1 text-[#007185] hover:text-[#C45500] hover:underline">
                  Try another period of time.
                </p>{" "}
              </div>
            )}
          </div>
        </section>
        <ProductsFooter></ProductsFooter>
        <StartingFooter></StartingFooter>
      </div>
    );
  }

  const purchaseList = purchases.map((purchase) => {
    const date = new Date(purchase.date);

    const dateFormated = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return (
      <PurchaseItem
        key={Math.random()}
        name={purchase.productName}
        //description={purchase.description}
        price={purchase.productPrice}
        quantity={purchase.quantity}
        date={dateFormated}
        imageUrl={purchase.productImageUrl}
      ></PurchaseItem>
    );
  });

  return (
    <div className=" min-w-[1200px]  bg-white">
      <div className="flex h-[55px] w-full items-center space-x-2 bg-navColor">
        <Link href="/">
          <div className=" ml-4 flex h-[45px] w-auto cursor-pointer items-center justify-center   rounded-sm border border-transparent  hover:border-white">
            <Image
              src={logoSite}
              alt="cart"
              width={90}
              height={90}
              className="mt-[13px]"
            />
          </div>
        </Link>
        <SearchBar></SearchBar>
        <Language></Language>
        <ProfileNav></ProfileNav>
        <div className="flex h-[45px]  w-auto cursor-pointer items-center justify-center rounded-sm border border-transparent px-3 hover:border-white ">
          <p className="font-sans text-sm font-semibold text-white">Orders</p>
        </div>
        <Cart></Cart>
      </div>
      <OptionsBar></OptionsBar>

      <section className="text  mx-auto w-[920px] font-sans">
        <div className="flex w-full flex-col">
          <div className="mb-[16px] mt-[8px] flex w-full  items-center text-[14px] ">
            <Link href="/profile">
              <p className="cursor-pointer text-[#007185] hover:text-[#C45500] hover:underline">
                Your Account
              </p>
            </Link>
            <IoIosArrowForward className=" mx-1 text-[12px] text-[#555555]"></IoIosArrowForward>
            <p className="text-[#C45500] ">Your Orders</p>
          </div>
          <div className="mb-[16px] flex w-full justify-between">
            <p className="     text-[#0F text-[28px] font-normal leading-9 text-[#0F1111]">
              Your Orders
            </p>
            <div className="flex w-[50%]">
              <form onSubmit={handleSubmit} className="flex grow">
                <div className="relative flex grow ">
                  <input
                    type="text"
                    placeholder="Search all orders"
                    className="h-[31px] w-full rounded border border-solid border-[#888C8C] py-[3px] pl-[29px] pr-[7px] font-sans outline-none ring-borderRingLogin placeholder:text-sm placeholder:text-gray-500 focus:border-borderLogin focus:ring"
                  />
                  <div className="pointer-events-none absolute left-2 top-2.5  ">
                    <FaSearch className="text-[13px] leading-5 text-[#0F1111]" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="ml-3 flex  h-[31px] w-auto min-w-11 items-center rounded-[100px] border border-black bg-[#303333] px-2.5  text-center text-[13px] text-sm font-bold leading-5 text-white ring-borderRingLogin  ring-opacity-100 hover:bg-black active:border  active:border-borderLogin 
                  active:outline-none active:ring
          "
                >
                  Search Orders
                </button>
              </form>
            </div>
          </div>
          <div className="mb-[16px]">
            <ul className="  ml-[18px] flex cursor-pointer  space-x-[10px] text-sm leading-5 text-[#007185] ">
              <li className="cursor-auto border-b-2 border-b-[#e47911] px-[10px] py-[5px] font-bold text-[#0F1111]  ">
                Orders
              </li>

              <li className="px-[10px] py-[5px] hover:text-[#C45500] hover:underline">
                Buy Again
              </li>
              <li className="px-[10px] py-[5px] hover:text-[#C45500] hover:underline">
                Not Yet Shipped
              </li>
              <li className="px-[10px] py-[5px] hover:text-[#C45500] hover:underline">
                Digital Orders
              </li>
              <li className="px-[10px] py-[5px] hover:text-[#C45500] hover:underline">
                Local Store Orders
              </li>
              <li className="px-[10px] py-[5px] hover:text-[#C45500] hover:underline">
                Cancelled Orders
              </li>
            </ul>
            <div className=" h-[1px] w-full bg-[#DDD]"></div>
          </div>
          <div className="mb-[16px]">
            <form className="font-sans text-[14px] leading-5 text-[#0f1111]">
              <label className="mr-[3.5px] pb-[2px] pl-[2px]">
                <strong>
                  {purchases.length === 0 ? 0 : purchases.length} orders
                </strong>{" "}
                placed in
              </label>
              <select
                onChange={handleChange}
                className="w-[115px] cursor-pointer truncate rounded-[7px] border border-solid border-[#d5d9d9] bg-[#F0F2F2] py-[2px] hover:bg-[#d5d9d9] hover:bg-opacity-60"
              >
                <option value={1}>last 30 days</option>
                <option value={2}>past 3 months</option>
                <option value={2024}>2024</option>
                <option value={2023}>2023</option>
                <option value={2022}>2022</option>
                <option value={2021}>2021</option>
                <option value={2020}>2020</option>
                <option value={2019}>2019</option>
                <option value={2018}>2018</option>
                <option value={2017}>2017</option>
                <option value={2016}>2016</option>
                <option value={3}>Archived Orders</option>
              </select>
            </form>
          </div>
          <div className="mb-[32px] mt-[24px] flex flex-col items-center justify-center text-[14px] leading-5 text-[#0f1111]">
            {purchaseList.slice(0, visibleItems).map((purchase, index) => (
              <div key={index}>{purchase}</div>
            ))}
            {visibleItems < purchaseList.length && (
              <button
                onClick={handleShowMore}
                className="cursor-pointer pl-1 font-sans text-[#007185] hover:text-[#C45500] hover:underline"
              >
                Show more
              </button>
            )}
          </div>
        </div>
      </section>
      <ProductsFooter></ProductsFooter>
      <StartingFooter></StartingFooter>
    </div>
  );
}

export default Purchases;
