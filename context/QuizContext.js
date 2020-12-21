import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const QuizContext = createContext()

// This context provider is passed to any component requiring the context
export const QuizProvider = ({ children }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy')
  const [selectedCategory, setSelectedCategory] = useState(31)

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
  )
}

QuizProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
}
