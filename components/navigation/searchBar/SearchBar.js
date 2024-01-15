import Image from "next/image";
import searchIcon from "../../../public/iconSearch.png";
import { useState } from "react";

const SearchBar = () => {
  const [clickeado, setClickeado] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Solo limpio el input y ya.
    event.target.reset();
  };

  const handleMouseDown = () => {
    setClickeado(true);
  };

  const handleMouseUp = () => {
    setClickeado(false);
  };

  return (
    <div
      className={`mx-1.5 flex h-10 grow  rounded-md ${
        clickeado
          ? "border-2 border-searchButtonBorder bg-searchButtonBorderBg ring-1 ring-searchButtonBorderRing ring-opacity-45"
          : ""
      }`}
      id="container"
    >
      {/*  */}
      <select className="h-full w-auto min-w-16 max-w-20 truncate rounded-bl-md rounded-tl-md border-r border-serachSelectBorder bg-zinc-200 indent-2.5 font-sans text-xs outline-none hover:bg-searchSelectHover hover:text-black focus:border-2 focus:border-searchButtonBorder focus:ring-1 focus:ring-searchButtonBorderRing focus:ring-opacity-45">
        <option value="1" className=" bg-gray-100">
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
          className="grow indent-2.5 font-sans outline-none placeholder:text-sm placeholder:text-gray-500"
        />

        <button
          type="submit"
          className="flex w-auto min-w-11 items-center justify-center rounded-br-md rounded-tr-md bg-searchButton hover:bg-searchButtonHover focus:border-2  focus:border-searchButtonBorder focus:ring-1 focus:ring-searchButtonBorderRing focus:ring-opacity-45 
          "
        >
          <Image src={searchIcon} alt="cart" width={20} height={20} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
