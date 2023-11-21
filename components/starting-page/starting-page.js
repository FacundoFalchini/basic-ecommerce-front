import Navigation from "../navigation/navigation";
import AvailableProducts from "../products/AvailableProducts";
//import classes from "./starting-page.module.css";
import { useState } from "react";
import { Fragment } from "react";

function StartingPageContent(props) {
  //Con estos 2 estados, me traigo desde navigation el seller y country, y se los paso a avaiableProducts.
  const [selectedSeller, setSeller] = useState(null);
  const [selectedCountry, setCountry] = useState(null);

  const countries = props.countries;
  const error = props.error;

  return (
    <Fragment>
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
    </Fragment>
  );
}

export default StartingPageContent;
