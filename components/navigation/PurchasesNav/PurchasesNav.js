import Link from "next/link";

const Orders = () => {
  return (
    <Link href="/purchases" className="block">
      <div className="flex h-[45px]  w-auto items-center justify-center rounded-sm border border-transparent px-3 hover:border-white ">
        <p className="font-sans text-sm font-semibold text-white">Orders</p>
      </div>
    </Link>
  );
};

export default Orders;
