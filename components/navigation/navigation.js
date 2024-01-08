import React, { Fragment } from "react";
//import Card from "../UI/Card";
//import classes from "./navigation.module.css";
import CountryDropdown from "./country/CountryDropdown";
import SellerDropdown from "./seller/SellerDropdown";
import Cart from "./cart/cart";
import Profile from "./profile/profile";
import { useState, useEffect } from "react";
import logo from "../../public/logo.png";
import Image from "next/image";
import Purchases from "./purchases/purchases";
import SearchBar from "./searchBar/SearchBar";
import Language from "./language/language";
import OptionsBar from "./optionsBar/OptionsBar";

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
  }, [selectedSeller]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (selectedCountry) {
      onSelectCountry(selectedCountry);
      onSelectSeller(null);
      //Agregando esto, acomodo el error que habia, que si bien al cambiar el pais el select del seller se volvia a su valor por default, no se llegaba a actualizar el valor a -1, sino que seguia valiendo el mismo valor de vendedor antes de cambiar de pais, y entonces al volver a poner el pais y el mismo seller, no entraba al useEffect de selectedSeller porque seguia valiendo lo mismo.
      setSelectedSeller("-1");
    }
    //Si bien aca, no sale como null, en el proximo render (cuando llega a starting page, si vale null)
  }, [selectedCountry]);

  return (
    <Fragment>
      <div className="flex items-center bg-navColor min-h-16 w-screen min-w-[1200px]">
        {/* Les coloco padding en lugar de margin xq el borde se coloca despues del padding y antes del margen y queda raro, quiero que quede bien fuera no antes del margen */}
        <div className=" flex items-center  justify-center ml-4 min-h-[58px] w-auto min-w-[66px]   border border-transparent hover:border-white rounded-sm">
          <Image src={logo} alt="cart" width={40} height={40} />
        </div>

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
        <SearchBar></SearchBar>
        <Language></Language>

        <Profile></Profile>

        <Purchases></Purchases>
        <Cart></Cart>
      </div>
      <OptionsBar></OptionsBar>
    </Fragment>
  );
};

export default Navigation;

/*
Antes de empezar a cambiar 
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

*/
