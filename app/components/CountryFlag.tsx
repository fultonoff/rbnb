"use client";
import React from "react";
import ReactCountryFlag from "react-country-flag";

const CountryFlag = ({ country }: { country: any }) => {
  console.log(country);
  const flag = String(country);
  let flag2 = "US";
  return <ReactCountryFlag countryCode={flag} svg  />;
};

export default CountryFlag;
