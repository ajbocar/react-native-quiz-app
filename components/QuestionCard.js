import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from '@ui-kitten/components';

const QuestionCard = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => (
  <View>
    <View style={styles.row}>
      <Text>
        Question: {questionNr} / {totalQuestions}
      </Text>
    </View>
    <View style={styles.row}>
      <Text>
        { question }
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default QuestionCard;