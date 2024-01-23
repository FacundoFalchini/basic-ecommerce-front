import React from "react";
import SellerDropdown from "../seller/SellerDropdown";
import Cart from "../cart/cart";
import Profile from "../profile/profile";
import { useState, useEffect } from "react";
import logo from "../../../public/logo.png";
import Image from "next/image";
import Orders from "../purchases/purchases";
import SearchBar from "../searchBar/SearchBar";
import Language from "../language/language";
import CountryDropdown from "../country/CountryDropdown";

const MainBar = (props) => {
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

  //min-w-[1200px]
  return (
    <div className="flex min-h-16 w-full items-center bg-navColor">
      <div className=" ml-4 flex  min-h-[58px] w-auto min-w-[66px] items-center justify-center   rounded-sm border border-transparent hover:border-white">
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
      <Orders></Orders>
      <Cart></Cart>
    </div>
  );
};

export default MainBar;
