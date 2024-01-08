import Sidebar from "../sideBar/SideBar";

const OptionsBar = () => {
  return (
    <div className="flex items-center justify-evenly min-h-10 max-h-10 w-screen shrink-0  bg-optionsBar min-w-[1200px]">
      <Sidebar></Sidebar>
      {/* Dejamos que el item NO se achique, se adapte al contenido y que crezca para ocupar el lugar vacio */}
      <p className="text-white text-sm font-semibold  border border-transparent hover:border-white rounded-sm h-10 flex justify-center items-center px-2 w-auto cursor-pointer shrink-0 grow font-sans">
        Atencion medica
      </p>
      <p className="text-white text-sm font-semibold  border border-transparent hover:border-white rounded-sm h-10 flex justify-center items-center px-2 w-auto cursor-pointer shrink-0 grow font-sans ">
        Food
      </p>
      <p className="text-white text-sm font-semibold  border border-transparent hover:border-white rounded-sm h-10 flex justify-center items-center px-2 w-auto cursor-pointer shrink-0 grow font-sans">
        Prime Video
      </p>
      <p className="text-white text-sm font-semibold  border border-transparent hover:border-white rounded-sm h-10 flex justify-center items-center px-2 w-auto cursor-pointer shrink-0 grow font-sans">
        Site basics
      </p>
      <p className="text-white text-sm font-semibold  border border-transparent hover:border-white rounded-sm h-10 flex justify-center items-center px-2 w-auto cursor-pointer shrink-0 grow font-sans">
        Offers of the day
      </p>
      <p className="text-white text-sm font-semibold  border border-transparent hover:border-white rounded-sm h-10 flex justify-center items-center px-2 w-auto cursor-pointer shrink-0 grow font-sans">
        Buy again
      </p>
      <p className="text-white text-sm font-semibold  border border-transparent hover:border-white rounded-sm h-10 flex justify-center items-center px-2 w-auto cursor-pointer shrink-0 font-sans">
        Prime
      </p>
      <p className="text-white text-sm font-semibold  border border-transparent hover:border-white rounded-sm h-10 flex justify-center items-center px-2 w-auto cursor-pointer shrink-0 grow font-sans">
        Customer service
      </p>
      <p className="text-white text-sm font-semibold  border border-transparent hover:border-white rounded-sm h-10 flex justify-center items-center px-2 w-auto cursor-pointer shrink-0 grow font-sans">
        Best sellers
      </p>
      <p className="text-white text-sm font-semibold  border border-transparent hover:border-white rounded-sm h-10 flex justify-center items-center px-2 w-auto cursor-pointer shrink-0 grow font-sans">
        Music
      </p>
      <p className="text-white text-sm font-semibold  border border-transparent hover:border-white rounded-sm h-10 flex justify-center items-center px-2 w-auto cursor-pointer shrink-0 grow font-sans">
        New releases
      </p>
      <p className="text-white text-sm font-semibold  border border-transparent hover:border-white rounded-sm h-10 flex justify-center items-center px-2 w-auto cursor-pointer shrink-0 grow font-sans">
        Gift cards
      </p>
      <p className="text-white text-sm font-semibold  border border-transparent hover:border-white rounded-sm h-10 flex justify-center items-center px-2 w-auto cursor-pointer shrink-0 grow font-sans max-[1240px]:hidden">
        Books
      </p>
      <p className="text-white text-sm font-semibold  border border-transparent hover:border-white rounded-sm h-10 flex justify-center items-center px-2 w-auto cursor-pointer shrink-0 grow font-sans max-[1290px]:hidden">
        Lists
      </p>
      <p className="text-white text-sm font-semibold  border border-transparent hover:border-white rounded-sm h-10 flex justify-center items-center px-2 w-auto cursor-pointer shrink-0 grow font-sans max-[1370px]:hidden">
        Coupons
      </p>
      <p className="text-white text-sm font-semibold  border border-transparent hover:border-white rounded-sm h-10 flex justify-center items-center px-2 w-auto cursor-pointer shrink-0 grow font-sans max-[1480px]:hidden">
        LiveStreams
      </p>
    </div>
  );
};

export default OptionsBar;
