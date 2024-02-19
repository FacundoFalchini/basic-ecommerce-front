import React from "react";
import SellerDropdown from "../SellerDropdown/SellerDropdown";
import Cart from "../CartNav/CartNav";
import Profile from "../ProfileNav/ProfileNav";
import { useState, useEffect } from "react";
import logoSite from "../../../public/logoSite.png";
import Image from "next/image";
import Orders from "../PurchasesNav/PurchasesNav";
import SearchBar from "../searchBar/SearchBar";
import Language from "../LanguageNav/LanguageNav";
import CountryDropdown from "../CountryDropwdown/CountryDropdown";
import { useRouter } from "next/router";

const MainBar = (props) => {
  const router = useRouter();
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
    <div className="flex h-[55px] w-full items-center space-x-2 bg-navColor">
      <div
        className=" ml-4 flex h-[45px] w-auto cursor-pointer items-center justify-center   rounded-sm border border-transparent  hover:border-white"
        onClick={router.reload}
      >
        <Image
          src={logoSite}
          alt="cart"
          width={90}
          height={90}
          className="mt-[13px]"
        />
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
