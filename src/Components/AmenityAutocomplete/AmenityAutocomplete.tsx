import * as React from "react";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";

interface Amenity {
  _id: { $oid: string };
  title: string;
  icon: string;
  __v: number;
}

interface AmenityAutocompleteProps {
  amenities: Amenity[];
  fixedOptions: Amenity[];
}

const AmenityAutocomplete: React.FC<AmenityAutocompleteProps> = ({
  amenities,
  fixedOptions,
}) => {
  const [value, setValue] = React.useState<Amenity[]>([...fixedOptions]);

  return (
    <Autocomplete
      multiple
      id="amenity-autocomplete"
      value={value}
      onChange={(event, newValue) => {
        setValue([
          ...fixedOptions,
          ...newValue.filter((option) => !fixedOptions.includes(option)),
        ]);
      }}
      options={amenities}
      getOptionLabel={(option) => option.title}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => {
          const { key, ...tagProps } = getTagProps({ index });
          return (
            <Chip
              key={key}
              label={option.title}
              {...tagProps}
              avatar={<Avatar src={option.icon} />}
              disabled={fixedOptions.includes(option)}
            />
          );
        })
      }
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Amenities"
          placeholder="Select Amenities"
        />
      )}
    />
  );
};

export default AmenityAutocomplete;
