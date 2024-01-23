//import { IoIosArrowForward } from "react-icons/io";

const HelpFooter = () => {
  return (
    <div className="mt-6 flex h-auto   flex-col justify-center bg-white  font-sans text-productsText">
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
    </div>
  );
};

export default HelpFooter;
