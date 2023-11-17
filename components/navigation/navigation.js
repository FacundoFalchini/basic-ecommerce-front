import React from "react";
import Card from "../UI/Card";
import classes from "./navigation.module.css";
import CountryDropdown from "./country/CountryDropdown";
import SellerDropdown from "./seller/SellerDropdown";
import Cart from "./cart/cart";
import Profile from "./profile/profile";
import { useState, useEffect } from "react";

const Navigation = (props) => {
  //Con estos 2 set, nos traemos el selectedCountry desde dropdowncountry y idem con el seller.
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedSeller, setSelectedSeller] = useState(null);
  //Esto viene desde country, para darle el ok a dropdownseller.
  const [isSellerSelectable, setIsSellerSelectable] = useState(false);

  //Y esto, es para pasarle el pais seleccionado y el vendedor seleccionado a su componente padre, starting page.
  const onSelectSeller = props.onSelectSeller;
  const onSelectCountry = props.onSelectCountry;

  const country = props.onCountries;
  const error = props.onError;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (selectedSeller) {
      onSelectSeller(selectedSeller);
    }
    //console.log(selectedSeller);
  }, [selectedSeller]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (selectedCountry) {
      onSelectCountry(selectedCountry);
      onSelectSeller(null);
    }
    //Si bien aca, no sale como null, en el proximo render (cuando llega a starting page, si vale null)
    //console.log(selectedCountry);
    //console.log(selectedSeller);
  }, [selectedCountry]);

  return (
    <Card>
      <div className={classes.container}>
        <div className={classes.leftgroup}>
          <CountryDropdown
            country={country}
            error={error}
            onSelectCountry={setSelectedCountry}
            onIsSellerSelectable={setIsSellerSelectable}
          ></CountryDropdown>
          <SellerDropdown
            onSelectSeller={setSelectedSeller}
            isSelectable={isSellerSelectable}
            selectedCountry={selectedCountry}
          ></SellerDropdown>
        </div>
        <div className={classes.rightgroup}>
          <Cart></Cart>
          <Profile></Profile>
        </div>
      </div>
    </Card>
  );
};

export default Navigation;
