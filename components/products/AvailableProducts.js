import classes from "./AvailableProducts.module.css";
import Card from "../UI/Card";
import { useEffect, useState } from "react";
import ProductItem from "./product-item/ProductItem";
import Loader from "../UI/loader";

const AvailableProducts = (props) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
      };

      fetchProducts().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
    }
  }, [seller]);

  if (isLoading) {
    return <Loader></Loader>;
  }

  if (!country || !seller || country === "-1" || seller === "-1") {
    return (
      <Card>
        <section className={classes.messageContainer}>
          <h1>Select country and seller</h1>
        </section>
      </Card>
    );
  }

  if (products.length === 0) {
    return (
      <Card>
        <section className={classes.messageContainer}>
          <h1>The seller has no products</h1>
        </section>
      </Card>
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
    <Card>
      <section className={classes.products}>
        <ul>{productList}</ul>
      </section>
    </Card>
  );
};

export default AvailableProducts;
