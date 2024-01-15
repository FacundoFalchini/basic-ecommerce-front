//import Image from "next/image";
//import spainIcon from "../../../public/spain.png";

const Language = () => {
  return (
    <div className="bg flex min-h-[58px] min-w-28 max-w-40 items-center justify-center rounded-sm border border-transparent hover:border-white">
      <select
        name="languages"
        id="language-dropdown"
        defaultValue=""
        className="h-[58px] w-full cursor-pointer truncate bg-navColor text-center  font-sans text-xs font-semibold text-white outline-none"
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
