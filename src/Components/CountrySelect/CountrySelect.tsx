import React, { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";

interface Country {
  label: string;
  value: string;
  flag: string;
}

interface CountrySelectProps {
  initialValue?: Country | null;
  onCountryChange?: (country: Country | null) => void;
}

export const CountrySelect: React.FC<CountrySelectProps> = ({
  initialValue,
  onCountryChange,
}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(
    initialValue || null
  );

  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(
          data.countries.map((country: any) => ({
            label: country.label,
            value: country.value,
            flag: country.flag,
          }))
        );
        if (!initialValue) {
          setSelectedCountry(data.userSelectValue);
        }
      });
  }, [initialValue]);

  const handleChange = (selectedOption: SingleValue<Country>) => {
    setSelectedCountry(selectedOption);
    if (onCountryChange) {
      onCountryChange(selectedOption);
    }
  };

  return (
    <Select
      options={countries}
      value={selectedCountry}
      onChange={handleChange}
      formatOptionLabel={(e) => (
        <div>
          <img
            src={e.flag}
            alt={e.label}
            style={{ width: "20px", marginRight: "10px" }}
          />
          {e.label}
        </div>
      )}
    />
  );
};
