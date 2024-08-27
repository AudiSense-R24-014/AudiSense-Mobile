import React from "react";
import { View, Text } from "react-native";
import QuestionButton from "../molecules/QuestionButton";
import AnswerButton from "../molecules/AnswerButton";

const MCQModel = () => {
  return (
    <View className="items-center my-4">
      <Text className="font-inter-semibold text-gray-700/50 mt-2 text-center">
        Question 1 of 5
      </Text>
      <QuestionButton text="What is the capital of France?" />
      <View className="flex-row justify-center mt-4">
        <View className="mt-4">
          <AnswerButton text="London" />
          <AnswerButton text="Berlin" />
        </View>
        <View className="mt-4">
          <AnswerButton text="Madrid" />
          <AnswerButton text="Rome" />
        </View>
      </View>
    </View>
  );
};

export default MCQModel;
