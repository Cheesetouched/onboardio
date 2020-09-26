export const getReactSelectStyle = (colorMode = "light") => {
  const isDarkMode = colorMode !== "light";

  const getSelectedColor = (isSelected) => {
    if (isDarkMode) {
      return isSelected ? "#eeeeee" : "#eeeeee";
    } else {
      return isSelected ? "#2D3958" : "#2D3958";
    }
  };

  return {
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
};
