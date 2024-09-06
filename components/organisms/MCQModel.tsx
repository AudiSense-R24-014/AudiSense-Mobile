import React from "react";
import { View, Text } from "react-native";
import QuestionButton from "../molecules/QuestionButton";
import AnswerButton from "../molecules/AnswerButton";
import CustomButton from "../atoms/CustomButton";
import ComprehensionTaskService from "@/services/ComprehensionTask.service";

const MCQModel = () => {
  const lockAnswer = (answer: string) => {
    ComprehensionTaskService.getComprehensiveTaskById(
      "66d21b756827cbf410a54aa6"
    )
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <View className="items-center my-4">
      <Text className="font-inter-semibold text-gray-700/50 mt-2 text-center">
        Question 1 of 5
      </Text>
      <QuestionButton text="What is the capital of France?" />
      <View className="flex-row justify-center mt-4">
        <View className="mt-4">
          <AnswerButton character="A" text="London" />
          <AnswerButton character="C" text="Berlin" />
        </View>
        <View className="mt-4">
          <AnswerButton
            character="B"
            text="Madrid"
            storeAnswer={() => lockAnswer("B")}
          />
          <AnswerButton character="D" text="Rome" />
        </View>
      </View>
      <View className="flex-row justify-center m-4 mt-12">
        <View className="flex-1 justify-center w-1/2  m-4">
          <CustomButton text="Back" buttonType="secondary" />
        </View>
        <View className="flex-1 justify-center w-1/2  m-4">
          <CustomButton text="Next" buttonType="primary" />
        </View>
      </View>
    </View>
  );
};

export default MCQModel;
