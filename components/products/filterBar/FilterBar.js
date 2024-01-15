const FilterBar = () => {
  return (
    <div className="h-full w-full  overflow-hidden pr-[5px] font-sans text-[14px] text-productsText">
      <p className="mb-[8px] font-bold">Deals & Discounts</p>
      <p className="cursor-pointer  hover:text-red-800">All Discounts</p>
      <p className="mb-[8px] cursor-pointer   hover:text-red-800">
        Today&apos;s Deals
      </p>
      <p className=" font-bold">Top Brands in Products</p>
      <div className="mb-[8px] flex cursor-pointer items-center ">
        <div className="mr-2 h-[14px] w-[14px] border border-[#CCCCCC] hover:border-[3px] hover:border-cyan-500 "></div>
        <p className="  hover:text-red-800 ">Top Brands</p>
      </div>
      <p className=" font-bold">Business Type </p>
      <div className="mb-[8px] flex cursor-pointer items-center  ">
        <div className="mr-2 h-[14px] w-[14px] border border-[#CCCCCC] hover:border-[3px] hover:border-cyan-500"></div>
        <p className="  hover:text-red-800">Small Business</p>
      </div>
      <p></p>
    </div>
  );
};

export default FilterBar;
