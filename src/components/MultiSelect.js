import React from "react";
import Select from "react-select";
import { useColorMode } from "@chakra-ui/core";

const MultiSelect = (props) => {
  const { options, values, onChange } = props;
  const { colorMode } = useColorMode();

  const getSelectedColor = (isSelected) => {
    if (colorMode === "light") {
      return isSelected ? "#2D3958" : "#2D3958";
    } else {
      return isSelected ? "#eeeeee" : "#eeeeee";
    }
  };

  const isDarkMode = colorMode !== "light";

  const dropdownStyle = {
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: isDarkMode ? "#272d38" : "#f2f2f2",
      color: isDarkMode ? "#eeeeee" : provided.color,
      zIndex: 200000000,
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: isDarkMode ? "#272d38" : "#f2f2f2",
      color: isDarkMode ? "#eeeeee" : provided.color,
      border: "none",
      padding: "4px",
      outline: "none",
      paddingRight: "0.25rem",
    }),
    input: (provided, state) => ({
      ...provided,
      color: isDarkMode ? "#eeeeee" : provided.color,
    }),
    container: (provided, state) => ({
      position: "relative",
      width: "100%",
    }),
    singleValue: (provided, state) => {
      return {
        ...provided,
        color: isDarkMode ? "#eeeeee" : "#2D3958",
        fontSize: "1rem",
      };
    },
    option: (provided, state) => {
      return {
        ...provided,
        color: getSelectedColor(state.isSelected),
        backgroundColor: "rgba(255,255,255,0.06)",
      };
    },
    multiValue: (provided, state) => {
      return {
        ...provided,
        backgroundColor: isDarkMode ? "#eeeeee" : provided.backgroundColor,
        color: isDarkMode ? "#393e46" : provided.color,
      };
    },
  };

  return (
    <Select
      isMulti
      styles={dropdownStyle}
      placeholder={"Select your services"}
      name="colors"
      value={values}
      onChange={onChange}
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );
};

export { MultiSelect };
