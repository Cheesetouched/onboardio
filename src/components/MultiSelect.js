import React from "react";
import Select from "react-select";

const MultiSelect = (props) => {
  const { options, values, mode, onChange } = props;

  const dropdownStyle =
    mode === "dark"
      ? {
          menu: (provided, state) => ({
            ...provided,
            backgroundColor: "#f2f2f2",
            zIndex: 200000000,
          }),
          control: (provided, state) => ({
            ...provided,
            backgroundColor: "#f2f2f2",
            border: "none",
            padding: "4px",
            outline: "none",
            paddingRight: "0.25rem",
          }),
          container: (provided, state) => ({
            position: "relative",
            width: "100%",
          }),
          singleValue: (provided, state) => {
            return { ...provided, color: "#2D3958", fontSize: "1rem" };
          },
          option: (provided, state) => {
            return {
              ...provided,
              color: state.isSelected ? "#2D3958" : "#2D3958",
              backgroundColor: "rgba(255,255,255,0.06)",
            };
          },
        }
      : {};

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
