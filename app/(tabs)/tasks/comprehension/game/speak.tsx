import React, { useEffect, useState } from "react";
import { View, SafeAreaView } from "react-native";
import ComprehensionHeader from "@/components/organisms/ComprehensionHeader";
import CircleWave from "@/components/molecules/CircleWave";
import ComprehensionTaskService from "@/services/ComprehensionTask.service";
import SpeechAssessModel from "@/components/organisms/SpeechAssessModel";

const Speak = () => {
  const [passage, setPassage] = useState("");
  const [questions, setQuestions] = useState<{ question: string, answerA: string, answerB: string, answerC: string, answerD: string, correctAnswer: string }[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lockedRecordings, setLockedRecordings] = useState<any[]>([]);

  useEffect(() => {
    // Fetch the comprehension task
    ComprehensionTaskService.getComprehensiveTaskById("66d21b756827cbf410a54aa6").then((data) => {
      setPassage(data?.passage);
      setQuestions(data?.questions);
    });
  }, []);

  const updateLockedRecording = (index: number, newValue: any) => {
    setLockedRecordings((prevLockedRecordings) => {
      const updatedRecordings = [...prevLockedRecordings];
      updatedRecordings[index] = newValue;
      return updatedRecordings;
    });
  };
  const lockRecording = (recording: any) => {
    updateLockedRecording(currentQuestionIndex, recording);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log("You have reached the last question.");
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
      <SafeAreaView className="flex-1 py-4 bg-gray-100 max-h-screen">
        <ComprehensionHeader title="Comprehension - Speech" subtitle="Listen to this amazing story!" />
        <View className="h-full">
          <CircleWave text={passage} />
          {questions.length > 0 && (
            <SpeechAssessModel
              question={questions[currentQuestionIndex]?.question}
              lockRecording={lockRecording}
              onNext={goToNextQuestion}
              onBack={goToPreviousQuestion}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              recordedAudio={lockedRecordings[currentQuestionIndex]}
            />
          )}
        </View>
      </SafeAreaView>
  );
};

export default Speak;
