import Link from "next/link";
//import Image from "next/image";

const Purchases = () => {
  return (
    <Link href="/purchases" className="block">
      <div className="flex items-center  justify-center min-h-[58px] max-h-[58px] w-auto min-w-28 border border-transparent hover:border-white rounded-sm ">
        <p className="text-white text-sm font-semibold font-sans">Orders</p>
      </div>
    </Link>
  );
};

export default Purchases;
