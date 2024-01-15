import { IoIosArrowForward } from "react-icons/io";

const ProductsFooter = () => {
  return (
    <div className="mt-6 flex h-auto   flex-col justify-center bg-white pb-12 font-sans text-productsText">
      <div className="ml-[312px] pb-[65px]">
        <p className="mb-2 w-[200px] text-[20px] font-bold">Need help?</p>
        <div className="flex">
          <p className="cursor-pointer text-[#007185]">
            Visit the help section
          </p>
          <p className="px-1">or</p>
          <p className="cursor-pointer text-[#007185]">contact us</p>
        </div>
      </div>

      <div className="flex h-[110px] items-center justify-between rounded-[5px] border border-solid border-[#DDD] px-[30px] py-[10px]">
        <p className="text-[13px] font-normal italic">
          After viewsing product detail pages, look here to find an easy way to
          navigate back to pages you are interested in.
        </p>
        <div className="flex">
          <IoIosArrowForward className="mr-1 text-[9px] text-[#007185]"></IoIosArrowForward>
          <p className="text w-[66px] cursor-pointer text-[10px] font-medium leading-none text-[#007185]">
            View or edit your browsing history
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductsFooter;
