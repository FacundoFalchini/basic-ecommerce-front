import { GiCrossbow } from "react-icons/gi";

const PurchaseItem = (props) => {
  return (
    <div className="mb-6 flex h-auto w-full flex-col rounded-xl border border-[#DDD] font-sans text-[#0F1111]">
      <div className=" border-b border-b-[#DDD] py-[16px] pl-[24px] font-bold leading-[14px]  ">
        {props.date}
      </div>
      <div className="flex w-full justify-between space-x-[24px] p-[24px] ">
        <div>
          <GiCrossbow className="rounded-xl border border-[#DDD] text-[74px]"></GiCrossbow>
        </div>
        <div className="line-clamp-4  w-[330px]  text-[16px] font-semibold">
          <p>{props.name}</p>
        </div>
        <div className=" flex-1 flex-col text-[16px] ">
          <p className="">Price: ${props.price}</p>
          <p>Quantity: {props.quantity} units.</p>
        </div>
        <div className=" ml-[50px] flex flex-1 flex-col items-end justify-center">
          <button className="border-yellow-Button mb-1 h-[32px] w-[160px] rounded-full border-[#ffd814] bg-yellowButton bg-opacity-90 px-3  text-[#0F1111]   ring-borderRingLogin ring-opacity-100 hover:bg-opacity-100  active:border active:border-borderLogin active:outline-none active:ring ">
            See Purchase
          </button>
          <button className="text- h-[32px] w-[160px] rounded-full  border border-[#FA8900] bg-[#FA8900] bg-opacity-90 px-3 text-[#0F1111] ring-borderRingLogin ring-opacity-100 hover:bg-opacity-100  active:border active:border-borderLogin active:outline-none active:ring">
            Repurchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseItem;
