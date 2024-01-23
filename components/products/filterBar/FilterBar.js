import { useState } from "react";
import { IoIosCheckbox } from "react-icons/io";

const FilterBar = () => {
  const [showCheckBox, setShowCheckBox] = useState(false);
  const [showCheckBox2, setShowCheckBox2] = useState(false);

  const handleClickCheck = () => {
    setShowCheckBox((prevState) => !prevState);
  };

  const handleClickCheck2 = () => {
    setShowCheckBox2((prevState) => !prevState);
  };

  return (
    <div className="h-full w-full  overflow-hidden pr-[5px] font-sans text-[14px] text-productsText">
      <p className="mb-[2px] font-bold">Department</p>

      <p className="mb-[8px] cursor-pointer   hover:text-red-800">
        International shipping products
      </p>
      <p className="mb-[2px] font-bold">Deals & Discounts</p>
      <p className="cursor-pointer  hover:text-red-800">All Discounts</p>
      <p className="mb-[8px] cursor-pointer   hover:text-red-800">
        Today&apos;s Deals
      </p>
      <p className=" font-bold">Top Brands in Products</p>
      <div className="relative mb-[8px] flex cursor-pointer items-center ">
        <div
          className="absolute mr-2 h-[13px] w-[13px] border border-[#CCCCCC] hover:border-[3px] hover:border-[#007185] "
          onClick={handleClickCheck}
        ></div>

        {showCheckBox && (
          <IoIosCheckbox
            className=" absolute left-[-2px]  text-[17px] text-[#007185]"
            onClick={handleClickCheck}
          ></IoIosCheckbox>
        )}
        <p className="ml-5  hover:text-red-800 " onClick={handleClickCheck}>
          Top Brands
        </p>
      </div>
      <p className=" font-bold">Business Type </p>
      <div className="relative mb-[8px] flex cursor-pointer items-center  ">
        <div
          className="absolute mr-2 h-[13px] w-[13px] border border-[#CCCCCC] hover:border-[3px] hover:border-[#007185]"
          onClick={handleClickCheck2}
        ></div>
        {showCheckBox2 && (
          <IoIosCheckbox
            className=" absolute left-[-2px]  text-[17px] text-[#007185]"
            onClick={handleClickCheck2}
          ></IoIosCheckbox>
        )}
        <p className="ml-5  hover:text-red-800" onClick={handleClickCheck2}>
          Small Business
        </p>
      </div>
      <p></p>
    </div>
  );
};

export default FilterBar;
