import { IoIosArrowForward } from "react-icons/io";

const ProductsFooter = () => {
  return (
    <div className=" flex h-auto   flex-col justify-center bg-white pb-12 font-sans text-productsText">
      <div className="flex h-[110px] items-center justify-between rounded-[5px] border border-solid border-[#DDD] px-[30px] py-[10px]">
        <p className="text-[13px] font-normal italic">
          After viewing product detail pages, look here to find an easy way to
          navigate back to pages you are interested in.
        </p>
        <div className="flex">
          <IoIosArrowForward className="mr-1 text-[9px] text-[#007185]"></IoIosArrowForward>
          <p className="text w-[66px]  cursor-pointer text-[10px] font-medium leading-none  text-[#007185] hover:text-red-900">
            View or edit your browsing history
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductsFooter;
