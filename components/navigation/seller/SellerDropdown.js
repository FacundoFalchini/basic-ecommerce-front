//import classes from "./SellerDropdown.module.css";
import { useEffect, useState } from "react";

function SellerDropdown(props) {
  const [sellers, setSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  //Si hay pais seleccionado, se permite usar el seller.
  const isSelectable = props.isSelectable;

  //Pais seleccionado en CountryDropdown, subido a Navigation y desde navigation se lo pasa al SellerDropdown para hacer el fetch.
  const selectedCountry = props.selectedCountry;

  //Esta es la funcion que le pasa el seller seleccionado a el componente padre (Navigation)
  const onSelectSeller = props.onSelectSeller;
  const handleSelect = (event) => {
    const selected = event.target.value;
    onSelectSeller(selected);
  };

  //Cada vez que CAMBIA el pais seleccionado, se envia la request para seleccionar los sellers de ese pais.
  useEffect(() => {
    if (selectedCountry) {
      const fetchSellers = async () => {
        const response = await fetch(
          `http://localhost:3000/sellers-country?country=${selectedCountry}`,
        );

        if (!response.ok) {
          throw new Error("Something went wrong!"); //Si hay algo malo, todo lo debajo no se ejecuta.
        }

        const responseData = await response.json();
        setSellers(responseData);
        setIsLoading(false);
      };

      fetchSellers().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
    }
  }, [selectedCountry]);

  if (isLoading) {
    return (
      <div className="bg flex min-h-[58px] min-w-28 max-w-40 items-center justify-center rounded-sm border border-transparent hover:border-white">
        <select
          disabled
          name="sellers"
          id="sellers-dropdown"
          defaultValue=""
          className="h-[58px] w-full cursor-not-allowed truncate bg-navColor text-center  font-sans text-sm font-semibold text-white outline-none"
        >
          <option value="" disabled className=" bg-navColor">
            Seller
          </option>
          <option value="2" className=" bg-navColor">
            Sellerasdasd
          </option>
        </select>
      </div>
    );
  }

  if (httpError) {
    return (
      <section>
        <p>{httpError}</p>
      </section>
    );
  }

  return (
    <div className="bg flex min-h-[58px] min-w-28 max-w-40 items-center justify-center rounded-sm border border-transparent hover:border-white">
      <select
        //Cuando no hay pais seleccionado, el dropdown de seller no se permite hacer.
        disabled={!isSelectable}
        onChange={handleSelect}
        name="sellers"
        id="sellers-dropdown"
        defaultValue=""
        className="h-[58px] w-full cursor-pointer truncate bg-navColor text-center  font-sans text-sm font-semibold text-white outline-none"
      >
        <option value="-1" className="bg-navColor ">
          Seller
        </option>
        {sellers.map((seller) => (
          <option key={seller.id} value={seller.id}>
            {seller.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SellerDropdown;
