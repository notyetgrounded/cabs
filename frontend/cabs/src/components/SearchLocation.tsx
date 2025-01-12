import { Autocomplete, Box, debounce, Grid2 } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useMemo, useState } from "react";
import { Predictions } from "../services/OlaMapsService";
import parse from 'autosuggest-highlight/parse';
import { PlacesSerice } from "../services/PlacesSerice";
import  globalContainer  from "../services/DependencyContainer";


export default function SearchLocation(props:any) {
  const label = props.label
  const [value, setValue] = useState<Predictions | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<readonly Predictions[]>([]);

  const fetch = useMemo(
    () =>
      debounce(
        (
          request: string,
          callback: (results?: readonly Predictions[]) => void
        ) => {

          const placesSerice= globalContainer.resolve<PlacesSerice>("placesSerice")
          placesSerice.getPlaces(request, callback);
        },
        400
      ),
    []
  );

  useEffect(()=>{props.location(value)},[value])
  useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch(inputValue, (results?: readonly Predictions[]) => {
      if (active) {
        let newOptions: readonly Predictions[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        noValidate
      >
        <Autocomplete
        // onClick={props.active(true)}
          disablePortal
          options={options}
          getOptionLabel={(option) =>
            typeof option === 'string' ? option : option.description
          }
          autoComplete
          value={value}
          sx={{ width: 300 }}
          filterOptions={(x) => x}
          onChange={(event: any, newValue: Predictions | null) => {
            // setOptions(newValue?[newValue,...options]:options);
            setValue(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label={label} />
          )}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            const matches = option.structured_formatting.main_text_matched_substrings || [];
            const parts = parse(
                option.structured_formatting.main_text,
                matches.map((match: any) => [match.offset, match.offset + match.length]),
              );
            return (<li key={key} {...optionProps}>
                <Grid2 container sx={{ alignItems: 'center' }}>
                  <Grid2 >
                    {parts.map((part, index) => (
                      <Box
                        key={index}
                        component="span"
                        sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                      >
                        {part.text}
                      </Box>
                    ))}
                  </Grid2>
                </Grid2>
              </li>);
          }}
        />
      </Box>
    </>
  );
}
