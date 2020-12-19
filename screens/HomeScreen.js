import React, { useContext } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Button, Divider, Layout, TopNavigation } from "@ui-kitten/components";
import { ThemeContext } from "../context/ThemeContext";

export const HomeScreen = ({ navigation }) => {
  const navigateDetails = () => {
    navigation.navigate("Details");
  };

  const navigateQuiz = () => {
    navigation.navigate("Quiz");
  };

  const themeContext = useContext(ThemeContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="MyApp" alignment="center" />
      <Divider />
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Button style={styles.btnStyle} onPress={themeContext.toggleTheme}>
          TOGGLE THEME
        </Button>
        <Button style={styles.btnStyle} onPress={navigateQuiz}>
          OPEN QUIZ
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    margin: 5,
  },
});
