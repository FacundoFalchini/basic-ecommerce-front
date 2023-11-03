import classes from "./CountryDropdown.module.css";

function CountryDropdown(props) {
  const countriesprops = props.country;
  const httpError = props.error;

  //Se pasa a navigation si hay pais seleccionado, y navigation le da el ok o no al seller dropdown.
  const onSellerSelectable = props.onIsSellerSelectable;

  //Esta es la funcion que le pasa el country seleccionado a el componente padre (Navigation)
  const onSelectCountry = props.onSelectCountry;
  const handleSelect = (event) => {
    const selected = event.target.value;
    onSelectCountry(selected);

    if (selected) {
      onSellerSelectable(true);
    } else {
      onSellerSelectable(false);
    }
  };

  if (httpError) {
    return (
      <section>
        <p>{httpError}</p>
      </section>
    );
  }

  return (
    <div className={classes.container}>
      <select
        onChange={handleSelect}
        className={classes.dropdown}
        name="paises"
        id="paises-dropdown"
        defaultValue=""
      >
        <option value="" disabled>
          Country
        </option>
        {countriesprops.map((country) => (
          <option key={country.id} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CountryDropdown;

/*
import { useEffect, useState } from "react";


  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();


  //A diferencia del seller, este se hace siempre el fetch no si hay o no country. (Cambiar mas adelante por getstaticprops)
  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch("http://localhost:3000/countries");

      if (!response.ok) {
        throw new Error("Something went wrong!"); //Si hay algo malo, todo lo debajo no se ejecuta.
      }

      const responseData = await response.json();
      setCountries(responseData);
      setIsLoading(false);
    };

    fetchCountries().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

*/
