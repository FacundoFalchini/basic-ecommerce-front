const Language = () => {
  return (
    <div className="bg flex min-h-[45px] w-auto max-w-40 items-center justify-center rounded-sm border border-transparent px-3 hover:border-white">
      <select
        name="languages"
        id="language-dropdown"
        defaultValue=""
        className="h-[45px] w-full cursor-pointer truncate bg-navColor text-center  font-sans text-xs font-semibold text-white outline-none"
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
