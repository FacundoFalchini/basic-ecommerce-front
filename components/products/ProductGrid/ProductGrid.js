import React from "react";
import ProductItem from "../ProductItem/ProductItem";

const ProductGrid = (props) => {
  const products = props.products;

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
    <div className="ml-[33px] grid grid-cols-[repeat(auto-fill,minmax(250px,290px))] gap-2 bg-white">
      {productList}
    </div>
  );
};

export default ProductGrid;
