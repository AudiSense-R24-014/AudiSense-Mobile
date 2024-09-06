import React, { useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import QuestionButton from "../molecules/QuestionButton";
import AnswerButton from "../molecules/AnswerButton";
import CustomButton from "../atoms/CustomButton";

const MCQModel = ({
  question,
  answerA,
  answerB,
  answerC,
  answerD,
  correctAnswer,
  lockAnswer,
  onNext,
  onBack,
  currentQuestionIndex,
  totalQuestions,
  lockedAnswer,
}: {
  question: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
  correctAnswer: string;
  lockAnswer: (answer: string) => void; // Function to lock the selected answer
  onNext: () => void; // Function to go to the next question
  onBack: () => void; // Function to go to the previous question
  currentQuestionIndex: number; // Current question index
  totalQuestions: number; // Total number of questions
  lockedAnswer: string; // The locked answer
}) => {
  useEffect(() => {
    // Log the locked answer
    console.log(lockedAnswer);
  }, [lockedAnswer]);
  return (
    <View className="items-center my-4">
      <Text className="font-inter-semibold text-gray-700/50 mt-2 text-center">
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </Text>
      <QuestionButton text={question} />
      <View className="flex-row justify-center mt-4">
        <View className="mt-4">
          <View
            className={`border-4 m-2 rounded-xl ${
              lockedAnswer == "A" ? "border-green-200" : "border-gray-100"
            }`}
          >
            <AnswerButton
              character="A"
              text={answerA}
              storeAnswer={() => lockAnswer("A")}
            />
          </View>
          <View
            className={`border-4 m-2 rounded-xl ${
              lockedAnswer == "C" ? "border-green-200" : "border-gray-100"
            }`}
          >
            <AnswerButton
              character="C"
              text={answerC}
              storeAnswer={() => lockAnswer("C")}
            />
          </View>
        </View>
        <View className="mt-4">
          <View
            className={`border-4 m-2 rounded-xl ${
              lockedAnswer == "B" ? "border-green-200" : "border-gray-100"
            }`}
          >
            <AnswerButton
              character="B"
              text={answerB}
              storeAnswer={() => lockAnswer("B")}
            />
          </View>
          <View
            className={`border-4 m-2 rounded-xl ${
              lockedAnswer == "D" ? "border-green-200" : "border-gray-100"
            }`}
          >
            <AnswerButton
              character="D"
              text={answerD}
              storeAnswer={() => lockAnswer("D")}
            />
          </View>
        </View>
      </View>
      <View className="flex-row justify-center m-4 mt-12 mx-10">
        {currentQuestionIndex != 0 && (
          <View className="flex-1 justify-center w-1/2 m-4">
            <Pressable onPress={onBack}>
              <CustomButton text="Back" buttonType="secondary" />
            </Pressable>
          </View>
        )}
        {currentQuestionIndex != totalQuestions - 1 ? (
          <View className="flex-1 justify-center w-1/2 m-4">
            <Pressable onPress={onNext}>
              <CustomButton text="Next" buttonType="primary" />
            </Pressable>
          </View>
        ) : (
          <View className="flex-1 justify-center w-1/2 m-4">
            <Pressable onPress={onNext}>
              <CustomButton text="Finish" buttonType="primary" />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

export default MCQModel;
