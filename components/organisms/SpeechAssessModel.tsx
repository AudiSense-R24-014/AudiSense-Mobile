import React from "react";
import { View, Text, Pressable } from "react-native";
import QuestionButton from "../molecules/QuestionButton";
import CustomButton from "../atoms/CustomButton";
import SpeechInput from "../molecules/SpeechInput";

const SpeechAssessModel = ({
  question,
  onNext,
  onBack,
  currentQuestionIndex,
  totalQuestions,
  lockRecording,
  recordedAudio,
}: {
  question: string;
  lockRecording: (answer: any) => void; // Function to lock the selected answer
  onNext: () => void; // Function to go to the next question
  onBack: () => void; // Function to go to the previous question
  currentQuestionIndex: number; // Current question index
  totalQuestions: number; // Total number of questions
  recordedAudio: any;
}) => {

  return (
    <View className="items-center my-4">
      <Text className="font-inter-semibold text-gray-700/50 mt-2 text-center">
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </Text>
      <QuestionButton text={question} />
      <View className="flex-row justify-center mt-2">
          <SpeechInput  lockRecording={lockRecording} recordedAudio={recordedAudio}/>
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

export default SpeechAssessModel;
