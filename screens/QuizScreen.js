import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Button,
} from '@ui-kitten/components';
import { QuestionCard } from '../components/QuestionCard';
import { decode } from 'base-64';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

export const QuizScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const TOTAL_QUESTIONS = 10;
  const DIFFICULTY = 'easy'; //easy, medium, hard
  const CATEGORY = 15;

  const shuffleArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5);

  const fetchQuizQuestions = async (amount, difficulty, category) => {
    //const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple&encode=base64`;
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
      DIFFICULTY,
      CATEGORY
    );
    //console.log(newQuestions);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (answer) => {
    if (!gameOver) {
      // User's answer
      //const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save the answer in the array for user answers
      //console.log(answer);
      //console.log(correct);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
      console.log(userAnswers);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
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

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title="MyApp"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category="h1">REACT QUIZ</Text>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <Button style={styles.btnStyle} onPress={startTrivia}>
            Start
          </Button>
        ) : null}
        {!gameOver ? <Text category="p1">Score: {score}</Text> : null}
        {loading ? <Text category="p1">Loading Questions...</Text> : null}
        {!loading && !gameOver && (
          <View>
            <View>
              <Text>
                Question: {number + 1} / {TOTAL_QUESTIONS}
              </Text>
            </View>
            <View>
              <Text>{decode(questions[number].question)}</Text>
            </View>
            <View>
              {questions[number].answers.map((answer) => (
                <View
                  key={answer}
                  correct={userAnswers[number]?.correctAnswer === answer}
                  userClicked={userAnswers[number]?.answer === answer}>
                  <Button
                    style={styles.btnStyle}
                    disabled={userAnswers[number] ? true : false}
                    onPress={() => checkAnswer(answer)}>
                    {decode(answer)}
                  </Button>
                </View>
              ))}
            </View>
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
