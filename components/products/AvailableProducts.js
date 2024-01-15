import classes from "./AvailableProducts.module.css";
import { useEffect, useState } from "react";
import ProductItem from "./product-item/ProductItem";
import FilterBar from "./filterBar/FilterBar";
import PagesBar from "./pagesBar/PagesBar";
import ProductsFooter from "../footers/ProductsFooter";

const AvailableProducts = (props) => {
  const [products, setProducts] = useState([]);
  //const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();

  //Obtengo el pais y el vendedor.
  const seller = props.onSearchSeller;
  const country = props.onSearchCountry;

  //Si hay un cambio de pais, pongo los productos vaicos, para evitar q al seleccionar vendedor de ese pais, se vea por un ratito los productos del vendor anterior.
  useEffect(() => {
    if (country) {
      setProducts([]);
    }
  }, [country]);

  //Si hay vendedor definido, hay el fetch, y cada vez que cambie el vendedor se hace el fetch de products.
  useEffect(() => {
    if (seller) {
      //setIsLoading(true);
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
        //setIsLoading(false);
      };

      fetchProducts().catch((error) => {
        //setIsLoading(false);
        setHttpError(error.message);
      });
    }
  }, [seller]);

  /*
  if (isLoading) {
    return <Loader></Loader>;
  }
*/

  if (!country || !seller || country === "-1" || seller === "-1") {
    return (
      <div className="flex h-[500px] w-full flex-col items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center justify-center rounded-[8px] border border-solid border-gray-300 px-10 py-10 font-sans text-gray-700">
          <p className="text-2xl font-bold text-gray-800">
            Select country and seller.
          </p>
          <p className="text-base">Explore our wide selection of products!</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
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
    );
  }

  if (httpError) {
    return (
      <section className={classes.ProductsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const productList = products.map((products) => {
    return (
      <ProductItem
        id={products.id}
        key={products.id}
        name={products.name}
        description={products.description}
        price={products.price}
        stock={products.stock}
      >
        {products.name}
      </ProductItem>
    );
  });

  return (
    <div className="h-auto w-full bg-white font-sans  ">
      <div className=" mx-auto mb-1 flex h-[40px] w-full justify-between border-b border-t border-solid border-[#CCCCCC] text-[14px] text-productsText shadow-[0_4px_6px_-1px_rgba(245,245,245,1)]">
        <div className="mx-auto flex w-[95%] justify-between">
          <p className="  flex h-full  items-center pl-1 font-medium">
            Number of results: {productList.length}
          </p>
          <select
            className=" my-auto flex  w-[130px]  cursor-pointer items-center truncate rounded-[8px] border border-[#D5D9D9] bg-[#F0F2F2] ring-borderRingLogin ring-opacity-100  placeholder:text-sm hover:bg-[#e3e6e6] 	
              focus:border-borderLogin focus:bg-bgRingCreate focus:bg-opacity-20  focus:outline-none focus:ring"
          >
            <option className="cursor-pointer" value="option1">
              Sort by: Featured
            </option>
            <option value="option2">Sort by: Price: Low to High</option>
            <option value="option3">Sort by: Price: High to Low</option>
            <option value="option3">Sort by: Avg. Customer Review</option>
            <option value="option3">Sort by: Price: Best Sellers</option>
          </select>
        </div>
      </div>
      <div className="mx-auto flex h-full w-[95%] bg-white py-6 ">
        <div className=" w-auto px-[4px] ">
          <FilterBar></FilterBar>
        </div>

        <div className=" ml-[100px]  flex-1  ">
          <div className="bg-white text-[20px] font-medium text-productsText">
            Results
          </div>
          <div className="bg-white pb-1     text-[14px] text-grayText ">
            Check each product to find the best option.
          </div>
          <div className="grid h-full  grid-cols-[repeat(auto-fill,minmax(250px,300px))]  gap-2 bg-white">
            {productList}
          </div>
        </div>
      </div>
      <PagesBar></PagesBar>
      <ProductsFooter></ProductsFooter>
    </div>
  );
};

export default AvailableProducts;

/*
Cuantas columnas va a hacer el repeat? Bueno esto lo determina el autofill, si tenemos solo 300px habra una sola columna, si tenemos 300-599 habra una sola pero mas grande de 300px (xq esta el 1fr como max), ahora si hay 600 px va a hacer 2 columnas de 300px cada una. 
*/
