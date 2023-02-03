import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDebounce } from "@/hooks/useDebounce";

type Props = {
  defaultLocation?: any;
  defaultGeoPoint?: any;
};

const ElemAddressInput = ({ defaultLocation, defaultGeoPoint }: Props) => {
  const { setValue: setFormValue } = useFormContext();
  const [value, setValue] = useState<any>(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<any>([]);

  const debouncedQuery = useDebounce(inputValue, 700);

  const onSearchAddress = async (keyword: string) => {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_RADAR_URL
      }/v1/search/autocomplete?query=${encodeURIComponent(keyword)}`,
      {
        method: "GET",
        headers: {
          Authorization: process.env.NEXT_PUBLIC_RADAR_PUBLIC_KEY || "",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setOptions(data?.addresses || []);
  };

  useEffect(() => {
    if (debouncedQuery === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    onSearchAddress(debouncedQuery);
  }, [debouncedQuery, value]);

  return (
    <Autocomplete
      id="elem-address-component"
      sx={{ width: "49%" }}
      filterOptions={(x) => x}
      getOptionLabel={(option) => option.formattedAddress}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No addresses found."
      onChange={(event, newValue: any) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        setFormValue(
          "location_json",
          newValue
            ? {
                address: newValue?.addressLabel,
                city: newValue?.city,
                state: newValue?.state,
                country: newValue?.country,
              }
            : defaultLocation,
          { shouldTouch: true }
        );
        setFormValue(
          "geopoint",
          newValue ? newValue?.geometry : defaultGeoPoint
        );
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Enter an address" fullWidth />
      )}
      renderOption={(props, option: any) => {
        return (
          <li {...props}>
            <p>{option.formattedAddress}</p>
          </li>
        );
      }}
    />
  );
};

export default ElemAddressInput;
