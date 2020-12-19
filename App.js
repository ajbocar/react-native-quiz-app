import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { AppNavigator } from "./navigator/AppNavigator";
import { ThemeContext } from "./context/ThemeContext";
import { QuizProvider } from "./context/QuizContext";

export default () => {
  const [theme, setTheme] = React.useState("light");

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider
        value={{
          theme,
          toggleTheme,
        }}
      >
        <QuizProvider>
          <ApplicationProvider {...eva} theme={eva[theme]}>
            <AppNavigator />
          </ApplicationProvider>
        </QuizProvider>
      </ThemeContext.Provider>
    </>
  );
};
