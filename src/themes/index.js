import _ from "lodash";
import darkTheme from "./darkTheme";
import lightTheme from "./lightTheme";

const DEFAULT_THEME = darkTheme;

const defaultThemeAttributes = {
  font: "Helvetica Neue,Arial,sans-serif",
  border: "5px solid",
  borderRadius: "5px",
};

export const themes = {
  dark: darkTheme,
  light: lightTheme,
};

export const getTheme = (themeName) => {
  let theme = themes[themeName];
  if (theme === undefined) {
    theme = DEFAULT_THEME;
  }
  return _.merge(defaultThemeAttributes, theme);
};
