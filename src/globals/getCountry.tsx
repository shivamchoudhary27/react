import CountryList from "./country";

export const searchCountryNameById = (countryCode : string) => {
    const country = CountryList.find((country) => country.id === countryCode);
    return country ? country.name : "";
};