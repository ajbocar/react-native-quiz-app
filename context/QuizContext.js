import React, { createContext, useState } from "react";

export const QuizContext = createContext();

// This context provider is passed to any component requiring the context
export const QuizProvider = ({ children }) => {
  const [selectedDifficulty, setSelectedDifficulty] = React.useState("easy");
  const [selectedCategory, setSelectedCategory] = React.useState(31);

  return (
    <QuizContext.Provider
      value={{
        selectedDifficulty,
        setSelectedDifficulty,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
