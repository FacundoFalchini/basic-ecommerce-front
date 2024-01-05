import Image from "next/image";
import searchIcon from "../../../public/iconSearch.png";
import { useState } from "react";

const SearchBar = () => {
  const [clickeado, setClickeado] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Solo limpio el input y ya.
    event.target.value = "";
  };

  const handleMouseDown = () => {
    setClickeado(true);
  };

  const handleMouseUp = () => {
    setClickeado(false);
  };

  return (
    <div
      className={`flex grow mx-1.5 h-10  rounded-md ${
        clickeado
          ? "border-2 border-searchButtonBorder ring-1 ring-searchButtonBorderRing ring-opacity-45 bg-searchButtonBorderBg"
          : ""
      }`}
      id="container"
    >
      {/*  */}
      <select className="h-full w-auto min-w-16 max-w-20 text-xs truncate indent-2.5 rounded-tl-md rounded-bl-md bg-zinc-200 hover:bg-searchSelectHover hover:text-black border-r border-serachSelectBorder focus:border-2 focus:border-searchButtonBorder focus:ring-1 focus:ring-searchButtonBorderRing focus:ring-opacity-45 outline-none">
        <option value="1" className=" bg-gray-100 ">
          All
        </option>
        <option value="2" className=" bg-gray-100 ">
          Food and gourmet products
        </option>
        <option value="3" className=" bg-gray-100 ">
          Premium Beauty
        </option>
        <option value="4" className=" bg-gray-100 ">
          Cinema and TV
        </option>
        <option value="5" className=" bg-gray-100 ">
          Apps and Games
        </option>
      </select>

      <form onSubmit={handleSubmit} className="flex grow">
        <input
          type="text"
          onFocus={handleMouseDown}
          onBlur={handleMouseUp}
          placeholder="Search..."
          className="grow outline-none indent-2.5 placeholder:text-gray-500 placeholder:text-sm"
        />

        <button
          type="submit"
          className="items-center flex justify-center w-auto min-w-11 rounded-br-md rounded-tr-md bg-searchButton hover:bg-searchButtonHover focus:border-2  focus:border-searchButtonBorder focus:ring-1 focus:ring-searchButtonBorderRing focus:ring-opacity-45 
          "
        >
          <Image src={searchIcon} alt="cart" width={20} height={20} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
