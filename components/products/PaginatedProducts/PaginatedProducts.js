import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ProductGrid from "../ProductGrid/ProductGrid";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const PaginatedProducts = (props) => {
  const items = props.products;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 24;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));

    const startIndex = itemOffset + 1;
    const endIndex = Math.min(itemOffset + itemsPerPage, items.length);
    const totalResults = items.length;
    props.onPageChange(
      `${startIndex}-${endIndex} of over ${totalResults} results`,
    );
  }, [itemOffset, itemsPerPage, items]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);

    const startIndex = newOffset + 1;
    const endIndex = Math.min(newOffset + itemsPerPage, items.length);
    const totalResults = items.length;

    props.onPageChange(
      `${startIndex}-${endIndex} of over ${totalResults} results`,
    );
  };

  const previus = (
    <span className="flex">
      <IoIosArrowBack className="mr-1 text-[20px] "></IoIosArrowBack>
      Previous
    </span>
  );

  const next = (
    <span className="flex">
      Next
      <IoIosArrowForward className="ml-1 text-[20px] "></IoIosArrowForward>
    </span>
  );

  return (
    <>
      <ProductGrid products={currentItems}></ProductGrid>

      <div className="mx-auto  flex h-auto   w-full justify-center ">
        <ReactPaginate
          breakLabel="..."
          nextLabel={next}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel={previus}
          renderOnZeroPageCount={null}
          containerClassName="mb-4 mt-6 flex mx-auto w-auto h-auto justify-center rounded-[8px] border border-solid border-[#d5d9d9] font-sans text-[14px] text-productsText shadow-[0_4px_6px_-1px_rgba(245,245,245,1)] "
          //Este es el modo default para botones individuales los botones.
          pageLinkClassName="flex h-12 w-12 cursor-pointer items-center justify-center px-3 hover:bg-[#e3e6e6]"
          //
          //Esto se CONCATENA al modo default cuando el boton esta activo
          activeLinkClassName="border border-solid border-[#0f1111] hover:cursor-default hover:bg-transparent"
          //Todo para NEXT y PREVIOUS.
          disabledLinkClassName="text-[#6f7373] cursor-default bg-transparent"
          disabledClassName="text-[#6f7373] cursor-default hover:bg-transparent"
          previousClassName="flex h-12 w-24 items-center justify-center px-3 hover:bg-[#e3e6e6] cursor-pointer"
          nextClassName="flex h-12 w-24 items-center justify-center rounded-r-[8px] px-3 hover:bg-[#e3e6e6] cursor-pointer"
          breakClassName="flex h-12 w-[34px] items-center justify-center px-3 text-[#6f7373] cursor-pointer "
          breakLinkClassName="cursor-pointer"
        />
      </div>
    </>
  );
};

export default PaginatedProducts;
