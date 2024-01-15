import Link from "next/link";
//import Image from "next/image";

const Purchases = () => {
  return (
    <Link href="/purchases" className="block">
      <div className="flex max-h-[58px]  min-h-[58px] w-auto min-w-28 items-center justify-center rounded-sm border border-transparent hover:border-white ">
        <p className="font-sans text-sm font-semibold text-white">Orders</p>
      </div>
    </Link>
  );
};

export default Purchases;
