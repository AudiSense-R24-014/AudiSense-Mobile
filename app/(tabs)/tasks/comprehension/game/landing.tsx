import React, { useEffect, useState } from "react";
import { View, SafeAreaView } from "react-native";
import ComprehensionHeader from "@/components/organisms/ComprehensionHeader";
import CircleWave from "@/components/molecules/CircleWave";
import MCQModel from "@/components/organisms/MCQModel";
import ComprehensionTaskService from "@/services/ComprehensionTask.service";

const Landing = () => {
  const [passage, setPassage] = useState("");
  const [questions, setQuestions] = useState<{ question: string, answerA: string, answerB: string, answerC: string, answerD: string, correctAnswer: string }[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lockedAnswers, setLockedAnswers] = useState<string[]>([]);

  useEffect(() => {
    // Fetch the comprehension task
    ComprehensionTaskService.getComprehensiveTaskById("66d21b756827cbf410a54aa6").then((data) => {
      setPassage(data?.passage);
      setQuestions(data?.questions);
    });
  }, []);

  const updateLockedAnswer = (index: number, newValue: string) => {
    setLockedAnswers((prevLockedAnswers) => {
      const updatedAnswers = [...prevLockedAnswers];
      updatedAnswers[index] = newValue;
      return updatedAnswers;
    });
  };
  const lockAnswer = (answer: string) => {
    updateLockedAnswer(currentQuestionIndex, answer);
    console.log(lockedAnswers);
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
      <SafeAreaView className="flex-1 py-4 bg-gray-100 h-max-screen">
        <ComprehensionHeader title="Comprehension - Listening" subtitle="Listen to this amazing story!" />
        <View className="h-full">
          <CircleWave text={passage} />
          {questions.length > 0 && (
            <MCQModel
              question={questions[currentQuestionIndex]?.question}
              answerA={questions[currentQuestionIndex]?.answerA}
              answerB={questions[currentQuestionIndex]?.answerB}
              answerC={questions[currentQuestionIndex]?.answerC}
              answerD={questions[currentQuestionIndex]?.answerD}
              correctAnswer={questions[currentQuestionIndex]?.correctAnswer}
              lockAnswer={lockAnswer}
              onNext={goToNextQuestion}
              onBack={goToPreviousQuestion}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              lockedAnswer={lockedAnswers[currentQuestionIndex]}
            />
          )}
        </View>
      </SafeAreaView>
  );
};

export default Landing;
