import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const PagesBar = () => {
  return (
    <div className="mx-auto   mt-6 flex h-auto   w-full justify-center ">
      <span className="mb-4   flex  h-auto w-auto justify-center rounded-[8px] border border-solid border-[#d5d9d9] font-sans text-[14px] text-productsText shadow-[0_4px_6px_-1px_rgba(245,245,245,1)] ">
        <span className="flex h-12 w-24 items-center justify-center px-3 text-[#6f7373]">
          <IoIosArrowBack className="mr-1 text-[20px]  text-[#6f7373]"></IoIosArrowBack>
          Previous
        </span>
        <span className="flex h-12 w-12  items-center justify-center border border-solid border-[#0f1111] px-3">
          1
        </span>
        <span className="flex h-12 w-12 cursor-pointer items-center justify-center px-3 hover:bg-[#e3e6e6]">
          2
        </span>
        <span className="flex h-12 w-12 cursor-pointer items-center justify-center px-3 hover:bg-[#e3e6e6]">
          3
        </span>
        <span className="flex h-12 w-[34px] items-center justify-center px-3 text-[#6f7373]">
          ...
        </span>
        <span className="flex h-12 w-12 items-center justify-center px-3 text-[#6f7373]">
          223
        </span>
        <div className="mt-[8px] h-[32px] w-[1px]  bg-[#d5d9d9]"></div>
        <span className="flex h-12 w-24 cursor-pointer items-center justify-center px-3 hover:bg-[#e3e6e6]">
          Next
          <IoIosArrowForward className="ml-1 text-[20px]"></IoIosArrowForward>
        </span>
      </span>
    </div>
  );
};

export default PagesBar;
