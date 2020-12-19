import React, { useState, useContext } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Button,
} from "@ui-kitten/components";
import { QuestionCard } from "../components/QuestionCard";
import { Spinner } from "@ui-kitten/components";
import { decode } from "base-64";
import { QuizContext } from "../context/QuizContext";

const BackIcon = (props) => <Icon {...props} name="arrow-back-outline" />;
const SettingsIcon = (props) => <Icon {...props} name="settings-2-outline" />;

export const QuizScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const TOTAL_QUESTIONS = 10;
  //const DIFFICULTY = "easy"; //easy, medium, hard
  //const CATEGORY = 15;

  const { selectedDifficulty, selectedCategory } = useContext(QuizContext);

  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

  const fetchQuizQuestions = async (amount, difficulty, category) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple&encode=base64`;
    console.log(endpoint);
    const data = await (await fetch(endpoint)).json();
    return data.results.map((question) => ({
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    }));
  };

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      selectedDifficulty,
      selectedCategory
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (answer) => {
    if (!gameOver) {
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQ = number + 1;
    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  const navigateSettings = () => {
    navigation.navigate("QuizSettings");
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const SettingsAction = () => (
    <TopNavigationAction icon={SettingsIcon} onPress={navigateSettings} />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title="MyApp"
        alignment="center"
        accessoryLeft={BackAction}
        accessoryRight={SettingsAction}
      />
      <Divider />
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text category="h1">REACT QUIZ</Text>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <Button style={styles.btnStyle} onPress={startTrivia}>
            Start
          </Button>
        ) : null}
        {loading ? (
          <View style={{ alignItems: "center" }}>
            <Text category="p1">Loading Questions...</Text>
            <Spinner />
          </View>
        ) : null}
        {!gameOver && !loading ? (
          <Text category="p1">Score: {score}</Text>
        ) : null}
        {!loading && !gameOver && (
          <View>
            <Text>
              Question: {number + 1} / {TOTAL_QUESTIONS}
            </Text>
            <View>
              <Text>{decode(questions[number].question)}</Text>
            </View>
            {questions[number].answers.map((answer) => (
              <View
                key={answer}
                correct={userAnswers[number]?.correctAnswer === answer}
                userClicked={userAnswers[number]?.answer === answer}
              >
                {userAnswers[number] ? (
                  <Button
                    status={
                      questions[number].correct_answer === answer
                        ? "success"
                        : "danger"
                    }
                    style={styles.btnStyle}
                  >
                    {decode(answer)}
                  </Button>
                ) : (
                  <Button
                    style={styles.btnStyle}
                    onPress={() => checkAnswer(answer)}
                  >
                    {decode(answer)}
                  </Button>
                )}
              </View>
            ))}
          </View>
        )}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <Button style={styles.btnStyle} onPress={nextQuestion}>
            Next Question
          </Button>
        ) : null}
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    margin: 5,
  },
});
