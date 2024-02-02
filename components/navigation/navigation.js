import React, { Fragment } from "react";
import OptionsBar from "./OptionsBar/OptionsBar";
import MainBar from "./MainBar/MainBar";

const Navigation = (props) => {
  return (
    <Fragment>
      <MainBar
        onCountries={props.onCountries}
        onError={props.onError}
        onSelectSeller={props.onSelectSeller}
        onSelectCountry={props.onSelectCountry}
      ></MainBar>
      <OptionsBar></OptionsBar>
    </Fragment>
  );
};

export default Navigation;
