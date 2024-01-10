//import Image from "next/image";
//import spainIcon from "../../../public/spain.png";

const Language = () => {
  return (
    <div className="flex items-center justify-center min-w-28 max-w-40 min-h-[58px] bg border border-transparent hover:border-white rounded-sm">
      <select
        name="languages"
        id="language-dropdown"
        defaultValue=""
        className="w-full h-[58px] text-center truncate bg-navColor text-white  text-xs font-semibold cursor-pointer outline-none font-sans"
      >
        <option value="english" className="bg-navColor ">
          🇬🇧 English
        </option>
        <option value="spanish" className="bg-navColor">
          🇪🇸 Español
        </option>
      </select>
    </div>
  );
};

export default Language;
