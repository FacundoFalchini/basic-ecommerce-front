import { useState, useEffect, Fragment } from "react";
import { IoIosCheckbox } from "react-icons/io";
import { GiCrossbow } from "react-icons/gi";

const CartItem = (props) => {
  const [localremove, setLocalErrorRemove] = useState(""); // Estado de error local
  const [localadd, setLocalErrorAdd] = useState("");
  const [localdelete, setLocalErrorDelete] = useState("");
  const [showErrorAdd, setShowErrorAdd] = useState(false);
  const [showErrorRemove, setShowErrorRemove] = useState(false);
  const [showErrorDelete, setShowErrorDelete] = useState(false);
  const [showCheckBox, setShowCheckBox] = useState(false);
  const [showCheckBox2, setShowCheckBox2] = useState(false);

  const handleClickCheck = () => {
    setShowCheckBox((prevState) => !prevState);
  };

  const handleClickCheck2 = () => {
    setShowCheckBox2((prevState) => !prevState);
  };

  //Y asi, para que cada uno tenga su estado de error local.
  const handleRemove = async () => {
    try {
      await props.onRemove();
      setLocalErrorRemove("");
    } catch (e) {
      setLocalErrorRemove(e.message);
    }
  };

  const handleAdd = async () => {
    try {
      await props.onAdd();
      setLocalErrorAdd("");
    } catch (e) {
      setLocalErrorAdd(e.message);
    }
  };

  const handleDelete = async () => {
    try {
      await props.onDelete();
      setLocalErrorDelete("");
    } catch (e) {
      setLocalErrorDelete(e.message);
    }
  };

  //Este useEffect es para hacer que el msg de error desaparezca a los 3 segundos.
  useEffect(() => {
    if (localadd) {
      setShowErrorAdd(true);

      const timer = setTimeout(() => {
        setShowErrorAdd(false);
        setLocalErrorAdd("");
      }, 1000); // 3000 milisegundos = 3 segundos

      return () => clearTimeout(timer); // Limpiar el timer si el componente se desmonta
    }
  }, [localadd]);

  //Este useEffect es para hacer que el msg de error desaparezca a los 3 segundos.
  useEffect(() => {
    if (localremove) {
      setShowErrorRemove(true);

      const timer = setTimeout(() => {
        setShowErrorRemove(false);
        setLocalErrorRemove("");
      }, 1000); // 3000 milisegundos = 3 segundos

      return () => clearTimeout(timer); // Limpiar el timer si el componente se desmonta
    }
  }, [localremove]);

  useEffect(() => {
    if (localdelete) {
      setShowErrorDelete(true);

      const timer = setTimeout(() => {
        setShowErrorDelete(false);
        setLocalErrorDelete("");
      }, 1000); // 3000 milisegundos = 3 segundos

      return () => clearTimeout(timer); // Limpiar el timer si el componente se desmonta
    }
  }, [localdelete]);

  const price = `$${props.price.toFixed(2)}`;
  return (
    <Fragment>
      <div className="relative border-b border-b-[#DDD] py-[12px] pl-[12px]">
        <div className="mt-[12px]">
          <div className="flex w-full">
            <div className="relative mb-[8px]   mr-[8px] ">
              <div
                className="absolute  inset-y-1/2  h-[13px]   w-[13px] rounded-sm border border-[#CCCCCC] hover:border-[3px] hover:border-[#007185]"
                onClick={handleClickCheck}
              ></div>
              {showCheckBox && (
                <IoIosCheckbox
                  className=" absolute left-[-2px] top-[86px] text-[17px] text-[#007185]"
                  onClick={handleClickCheck}
                ></IoIosCheckbox>
              )}
            </div>

            <div className="mb-[4px] mr-[12px]">
              <GiCrossbow className="text-[180px]"></GiCrossbow>
            </div>
            <div className="flex w-full">
              <div className="w-full">
                <div className="flex grow justify-between">
                  <p className="mb-[4px] line-clamp-2 max-h-[50px]  w-[80%] cursor-pointer overflow-hidden text-ellipsis font-sans text-[18px] text-[#0F1111]">
                    {props.name}
                  </p>
                  <p className="flex w-[20%] justify-end font-sans text-[18px] font-bold text-[#0F1111]">
                    {price}
                  </p>
                </div>
                {props.stock != 0 && (
                  <div className="font-sans text-[12px] leading-4 text-[#007600]">
                    In stock: {props.stock}
                  </div>
                )}
                {props.stock === 0 && (
                  <div className="font-sans text-[12px] leading-4       text-[#BA0933]">
                    In stock: {props.stock}
                  </div>
                )}

                <div className="relative mb-[20px]  mt-[4px] flex items-center font-sans text-[#0F1111]">
                  <div
                    className="absolute h-[13px] w-[13px] rounded-sm border border-[#CCCCCC]"
                    onClick={handleClickCheck2}
                  ></div>
                  {showCheckBox2 && (
                    <IoIosCheckbox
                      className=" absolute left-[-2px]  text-[17px] text-[#0075ff]"
                      onClick={handleClickCheck2}
                    ></IoIosCheckbox>
                  )}

                  <p className="ml-3 pl-[5px] text-[12px]">
                    This is a gift.{" "}
                    <a className="cursor-pointer text-[#007185] hover:text-[#C45500] hover:underline">
                      Learn more
                    </a>
                  </p>
                </div>
                <div className="my-[5px]  ">
                  <ul className="   flex cursor-pointer   flex-wrap items-center space-x-[10px] text-[12px] leading-4 text-[#007185] ">
                    <div className=" flex shrink-0 cursor-auto items-center rounded-sm border  border-[#DDD] bg-[#F0F2F2] px-2 py-1 text-[13px] text-[#0F1111] shadow-md">
                      Qty: {props.amount}
                      <button
                        className="mx-2 h-[19px] w-[19px] rounded-sm border border-[#DDD] hover:bg-[#dbdbdb]"
                        onClick={handleAdd}
                      >
                        +
                      </button>
                      <button
                        className="h-[19px] w-[19px] rounded-sm border border-[#DDD] hover:bg-[#dbdbdb] "
                        onClick={handleRemove}
                      >
                        -
                      </button>
                    </div>
                    <div className=" mx-[9.5px] h-[14px] w-[1px] bg-[#DDD]"></div>
                    <li className="  hover:underline" onClick={handleDelete}>
                      Delete
                    </li>
                    <div className=" mx-[9.5px] h-[14px] w-[1px] bg-[#DDD]"></div>
                    <li className="  hover:underline">Save for later</li>
                    <div className=" mx-[9.5px] h-[14px] w-[1px] bg-[#DDD]"></div>
                    <li className="  hover:underline">
                      Compare with similar items
                    </li>
                    <div className=" mx-[9.5px] h-[14px] w-[1px] bg-[#DDD]"></div>
                    <li className="   hover:underline">Share</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showErrorRemove && (
          <div className="absolute left-1/2  -translate-x-1/2 -translate-y-1/2 transform   text-center font-sans text-[12px] text-[#BA0933] ">
            Remove error: {localremove}
          </div>
        )}
        {showErrorAdd && (
          <div className="absolute left-1/2  -translate-x-1/2 -translate-y-1/2 transform   text-center font-sans text-[12px] text-[#BA0933] ">
            Add error: {localadd}
          </div>
        )}

        {showErrorDelete && (
          <div className="absolute left-1/2  -translate-x-1/2 -translate-y-1/2 transform   text-center font-sans text-[12px] text-[#BA0933] ">
            Delete error: {localdelete}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default CartItem;
