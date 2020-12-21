import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView, View, StyleSheet } from 'react-native'
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Select,
  SelectItem,
  Spinner,
  IndexPath,
  Button,
} from '@ui-kitten/components'
import PropTypes from 'prop-types'
import { QuizContext } from '../context/QuizContext'

const BackIcon = (props) => <Icon {...props} name="arrow-back" />

export const QuizSettingsScreen = ({ navigation }) => {
  const navigateBack = () => {
    navigation.goBack()
  }

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  )

  const [loading, setLoading] = useState(false)
  const [selectedDifficultyIndex, setSelectedDifficultyIndex] = React.useState(
    new IndexPath(0),
  )
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(
    new IndexPath(0),
  )
  const [categories, setCategories] = useState([])

  const difficultyArray = ['easy', 'medium', 'hard']

  const fetchQuizCategories = async () => {
    const endpoint = `https://opentdb.com/api_category.php`
    const data = await (await fetch(endpoint)).json()
    // console.log(data);
    return data.trivia_categories
  }

  const initializePage = async () => {
    setLoading(true)
    const newCategories = await fetchQuizCategories()
    setCategories(newCategories)
    setLoading(false)
  }

  const { setSelectedDifficulty, setSelectedCategory } = useContext(QuizContext)

  const saveSettings = () => {
    setSelectedDifficulty(difficultyArray[selectedDifficultyIndex.row])
    setSelectedCategory(categories[selectedCategoryIndex.row].id)
    navigation.goBack()
  }

  useEffect(() => {
    initializePage()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title="MyApp"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        level="1"
      >
        <Text category="h1">Quiz Settings</Text>
        <Select
          label="Difficulty"
          style={styles.select}
          selectedIndex={selectedDifficultyIndex}
          onSelect={(index) => setSelectedDifficultyIndex(index)}
          value={difficultyArray[selectedDifficultyIndex.row]}
        >
          <SelectItem title={difficultyArray[0]} />
          <SelectItem title={difficultyArray[1]} />
          <SelectItem title={difficultyArray[2]} />
        </Select>
        {loading ? (
          <View style={{ alignItems: 'center' }}>
            <Text category="p1">Loading Categories...</Text>
            <Spinner />
          </View>
        ) : null}
        {!loading && (
          <View>
            <Select
              label="Category"
              value={
                categories[selectedCategoryIndex.row]
                  ? categories[selectedCategoryIndex.row].name
                  : ''
              }
              style={styles.select}
              selectedIndex={selectedCategoryIndex}
              onSelect={(index) => setSelectedCategoryIndex(index)}
            >
              {categories.map((category) => (
                <SelectItem title={category.name} key={category.id} />
              ))}
            </Select>
            <Button style={styles.btnStyle} onPress={saveSettings}>
              Save Settings
            </Button>
          </View>
        )}
      </Layout>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  select: {
    width: 300,
  },
  btnStyle: {
    margin: 5,
  },
})

QuizSettingsScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
}
