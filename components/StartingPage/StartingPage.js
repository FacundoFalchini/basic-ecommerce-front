import StartingFooter from "../footers/startingFooter";
import AvailableProducts from "../Products/AvailableProducts";
import Navigation from "../navigation/navigation";
import { useState } from "react";

function StartingPageContent(props) {
  //Con estos 2 estados, me traigo desde navigation el seller y country, y se los paso a avaiableProducts.
  const [selectedSeller, setSeller] = useState(null);
  const [selectedCountry, setCountry] = useState(null);
  const countries = props.countries;
  const error = props.error;

  //En el componente que contiene todo clavo el min-widht, despues en todos los otros componentes hijos, que estan contenidos a su vez en algun div, le coloco a ese w-full para que ocupe todo el tamanio de su contenedor padre.
  return (
    <div className="min-w-[1200px]">
      <Navigation
        onCountries={countries}
        onError={error}
        onSelectSeller={setSeller}
        onSelectCountry={setCountry}
      ></Navigation>
      <AvailableProducts
        onSearchSeller={selectedSeller}
        onSearchCountry={selectedCountry}
      />
      <StartingFooter></StartingFooter>
    </div>
  );
}

export default StartingPageContent;
