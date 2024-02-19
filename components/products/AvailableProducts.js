import { Fragment, useEffect, useState } from "react";
import FilterBar from "./filterBar/FilterBar";
import ProductsFooter from "../footers/ProductsFooter";
import HelpFooter from "../footers/HelpFooter";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import Loader from "../UI/Loader";
import PaginatedProducts from "./PaginatedProducts/PaginatedProducts";

const AvailableProducts = (props) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();
  const [selectUsed, setSelectedUsed] = useState(false); //Este para manejar la primera vez, q se muestre el productList normal.
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [rangeInfo, setRangeInfo] = useState("");

  //Obtengo el pais y el vendedor.
  const seller = props.onSearchSeller;
  const country = props.onSearchCountry;

  //Si hay un cambio de pais, pongo los productos vaicos, para evitar q al seleccionar vendedor de ese pais, se vea por un ratito los productos del vendor anterior.
  useEffect(() => {
    if (country) {
      setProducts([]);
    }
  }, [country]);

  //Si hay vendedor definido, hay el fetch, y cada vez que cambie el vendedor se hace el fetch de products. Este SIEMPRE va a ser para la opcion default del Select que es Featured

  useEffect(() => {
    if (seller) {
      setIsLoading(true);
      setProducts([]);
      const fetchProducts = async () => {
        const response = await fetch(
          `http://localhost:3000/products-seller?sellerId=${seller}`,
        );

        if (!response.ok) {
          throw new Error("Something went wrong!"); //Si hay algo malo, todo lo debajo no se ejecuta.
        }

        const responseData = await response.json();
        setProducts(responseData);
        setIsLoading(false);

        if (seller != "-1") {
          filterProductsItems("1");
        }
      };

      fetchProducts().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
    }
  }, [seller]);

  const handleChange = (event) => {
    setSelectedUsed(true);
    filterProductsItems(event.target.value);
  };

  const filterProductsItems = async (filter) => {
    let URL = "";
    if (filter === "1" || filter === "5" || filter === "6") {
      URL = `http://localhost:3000/products-seller?sellerId=${seller}`;
    } else if (filter === "2") {
      URL = `http://localhost:3000/products-seller-stock?sellerId=${seller}`;
    } else if (filter === "3") {
      URL = `http://localhost:3000/products-seller-lowprice?sellerId=${seller}`;
    } else if (filter === "4") {
      URL = `http://localhost:3000/products-seller-highprice?sellerId=${seller}`;
    }

    try {
      setIsLoading(true);
      const response = await fetch(URL);

      if (!response.ok) {
        const responseData = await response.json();
        const errorMsg =
          responseData.message ||
          (responseData.errors &&
          responseData.errors[0] &&
          responseData.errors[0].message
            ? responseData.errors[0].message
            : "Something went wrong!");
        setIsLoading(false);
        throw new Error(errorMsg);
      }

      setIsLoading(false);
      const data = await response.json();

      setProductsFiltered(
        <PaginatedProducts
          products={data}
          onPageChange={handlePageChange}
        ></PaginatedProducts>,
      );
    } catch (error) {
      setHttpError(error.message);
    }
  };

  const handlePageChange = (info) => {
    setRangeInfo(info);
  };

  /*
  No uso esta opcion xq me reinicia la opcion del sort
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <Loader></Loader>
      </div>
    );
  }
  */

  const Loading = (
    <div className="flex h-[700px] items-center justify-center bg-white">
      <Loader></Loader>
    </div>
  );

  if (httpError) {
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
            <h2 className="  font-sans text-xs text-blackText">{httpError}</h2>
          </div>
        </div>
      </div>
    );
  }

  if (!country || !seller || country === "-1" || seller === "-1") {
    return (
      <Fragment>
        <div className="flex h-[500px] w-full flex-col items-center justify-center bg-gray-100">
          <div className="flex flex-col items-center justify-center rounded-[8px] border border-solid border-gray-300 px-10 py-10 font-sans text-gray-700">
            <p className="text-2xl font-bold text-gray-800">
              Select country and seller.
            </p>
            <p className="text-base">Explore our wide selection of products!</p>
          </div>
        </div>
        <ProductsFooter></ProductsFooter>
      </Fragment>
    );
  }

  if (products.length === 0) {
    return (
      <Fragment>
        <div className="flex h-[500px] w-full flex-col items-center justify-center bg-gray-100">
          <div className="flex flex-col items-center justify-center rounded-[8px] border border-solid border-gray-300 px-10 py-10 font-sans text-gray-700">
            <p className="text-2xl font-bold text-gray-800">
              The seller has no products.
            </p>
            <p className="text-base">
              Discover more by trying a different seller!
            </p>
          </div>
        </div>
        <ProductsFooter></ProductsFooter>
      </Fragment>
    );
  }

  const productListPaginated2 = (
    <PaginatedProducts
      products={products}
      onPageChange={handlePageChange}
    ></PaginatedProducts>
  );

  return (
    <div className="h-auto w-full bg-white font-sans  ">
      <div className=" mx-auto mb-1 flex h-[40px] w-full justify-between border-b border-t border-solid border-[#CCCCCC] text-[14px] text-productsText shadow-[0_4px_6px_-1px_rgba(245,245,245,1)]">
        <div className="mx-auto flex w-[96%] justify-between">
          <p className="  ml-[20px] flex h-full  items-center pl-1 font-medium">
            {rangeInfo}
          </p>
          <select
            onChange={handleChange}
            className=" my-auto mr-[85px]  flex  w-[130px] cursor-pointer items-center truncate rounded-[8px] border border-[#D5D9D9] bg-[#F0F2F2] text-[11px]  ring-borderRingLogin ring-opacity-100 	
              placeholder:text-sm hover:bg-[#e3e6e6] focus:border-borderLogin  focus:bg-bgRingCreate focus:bg-opacity-20 focus:outline-none focus:ring"
          >
            <option className="cursor-pointer" value={1}>
              Sort by: Featured
            </option>
            <option value={2}>Sort by: Stock: High to Low</option>
            <option value={3}>Sort by: Price: Low to High</option>
            <option value={4}>Sort by: Price: High to Low</option>
            <option value={5}>Sort by: Avg. Customer Review</option>
            <option value={6}>Sort by: Price: Best Sellers</option>
          </select>
        </div>
      </div>
      <div className="mx-auto flex h-full w-[96%] bg-white py-[10px] ">
        <div className=" ml-[20px] mt-[5px] w-auto px-[4px] ">
          <FilterBar></FilterBar>
        </div>

        <div className=" ml-[60px]  flex-1  ">
          <div className="ml-[33px] bg-white text-[20px] font-medium text-productsText">
            Results
          </div>
          <div className="ml-[33px] bg-white pb-1    text-[14px] text-grayText ">
            Check each product to find the best option.
          </div>
          {isLoading && Loading}

          {!isLoading &&
            (selectUsed === true ? productsFiltered : productListPaginated2)}
        </div>
      </div>
      {/* <PagesBar></PagesBar> */}
      <HelpFooter></HelpFooter>
      <ProductsFooter></ProductsFooter>
    </div>
  );
};

export default AvailableProducts;
