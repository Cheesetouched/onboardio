import React from "react";
import Select from "react-select";
import { useColorMode } from "@chakra-ui/core";
import { getReactSelectStyle } from "../styles/DropdownStyle";

const SingleSelect = (props) => {
  const { options, value, onChange, placeholder } = props;
  const { colorMode } = useColorMode();
  return (
    <Select
      styles={getReactSelectStyle(colorMode)}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      options={options}
      classNamePrefix="select"
    />
  );
};

export { SingleSelect };
