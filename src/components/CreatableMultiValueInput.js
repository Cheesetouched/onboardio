import React from "react";
import { useColorMode } from "@chakra-ui/core";
import { getReactSelectStyle } from "../styles/DropdownStyle";
import CreatableSelect from "react-select/creatable";

const CreatableMultiValueInput = (props) => {
  const { options, values, onChange, placeholder } = props;
  const { colorMode } = useColorMode();

  return (
    <CreatableSelect
      isMulti
      styles={{
        ...getReactSelectStyle(colorMode),
        menu: (provided, state) => ({
          ...provided,
          display: "none",
        }),
      }}
      placeholder={placeholder}
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }}
      value={values}
      onChange={onChange}
      options={options}
      classNamePrefix="select"
    />
  );
};

export { CreatableMultiValueInput };
