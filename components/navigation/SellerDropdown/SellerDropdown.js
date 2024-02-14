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
        /*
        const response = await fetch(
          `http://localhost:3000/sellers-country?country=${selectedCountry}`,
        );
*/

        const response = await fetch(
          `http://localhost:3000/sellers-countryId?countryId=${selectedCountry}`,
        );

        if (!response.ok) {
          throw new Error("Something went wrong!");
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

  if (httpError) {
    return (
      <section>
        <p>{httpError}</p>
      </section>
    );
  }

  //El estado de loding es por default TRUE, entonces siempre sale por aca hasta que se seleccione el pais.
  if (isLoading) {
    return (
      <div className="bg flex max-h-[50px] w-40 max-w-40 items-center justify-center rounded-sm border border-transparent px-3 ">
        <select
          disabled
          name="sellers"
          id="sellers-dropdown"
          defaultValue=""
          className="h-[45px] w-full  truncate bg-navColor text-center  font-sans text-sm font-semibold text-white outline-none"
        >
          <option value="">Seller</option>
        </select>
      </div>
    );
  }

  return (
    <div
      className={`bg  flex max-h-[50px] w-40 max-w-40 items-center justify-center rounded-sm border border-transparent px-3 ${
        isSelectable ? " hover:border-white" : ""
      }`}
    >
      <select
        //Cuando no hay pais seleccionado, el dropdown de seller no se permite hacer.
        disabled={!isSelectable}
        onChange={handleSelect}
        name="sellers"
        id="sellers-dropdown"
        defaultValue=""
        className={`h-[45px] w-full  truncate bg-navColor text-center  font-sans text-sm font-semibold text-white outline-none ${
          isSelectable ? " cursor-pointer" : ""
        }`}
      >
        <option value="-1" className="bg-navColor ">
          Seller
        </option>
        {sellers.map((seller) => (
          <option
            key={seller.id}
            value={seller.id}
            className="cursor-pointer bg-navColor "
          >
            {seller.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SellerDropdown;
