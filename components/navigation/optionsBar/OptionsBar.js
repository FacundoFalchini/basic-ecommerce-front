import Sidebar from "../SideBar/SideBar";

const OptionsBar = () => {
  const generateClassName = (maxWidth) => `
   font-semibold border border-transparent 
  hover:border-white rounded-sm h-10 flex justify-center text-white text-sm items-center 
  px-3 w-auto mx-auto cursor-pointer  grow font-sans  h-[35px]
  ${maxWidth ? `max-[${maxWidth}]:hidden` : ""}
`;

  return (
    <div className="flex h-[35px] w-full items-center justify-evenly bg-optionsBar   ">
      <Sidebar></Sidebar>
      <p className={generateClassName()}>Medical Care</p>
      <p className={generateClassName()}>Groceries</p>
      <p className={generateClassName()}>Prime Video</p>
      <p className={generateClassName()}>Site basics</p>
      <p className={generateClassName()}>Today&apos;s Deals</p>
      <p className={generateClassName()}>Buy again</p>
      <p className={generateClassName()}>Prime</p>
      <p className={generateClassName()}>Customer service</p>
      <p className={generateClassName()}>Best sellers</p>
      <p className={generateClassName()}>Music</p>
      <p className={generateClassName()}>New releases</p>
      <p className={generateClassName()}>Gift cards</p>
      <p className={generateClassName("1240px")}>Books</p>
      <p className={generateClassName("1290px")}>Registry</p>
      <p className={generateClassName("1370px")}>Coupons</p>
      <p className={generateClassName("1480px")}>LiveStreams</p>
    </div>
  );
};

export default OptionsBar;
