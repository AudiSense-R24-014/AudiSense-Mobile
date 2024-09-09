import React, { useEffect, useState } from "react";
import { View, SafeAreaView } from "react-native";
import ComprehensionHeader from "@/components/organisms/ComprehensionHeader";
import CircleWave from "@/components/molecules/CircleWave";
import MCQModel from "@/components/organisms/MCQModel";
import ComprehensionTaskService from "@/services/ComprehensionTask.service";
import { router } from "expo-router";

const Listen = () => {
  const [passage, setPassage] = useState("");
  const [questions, setQuestions] = useState<
    {
      question: string;
      answerA: string;
      answerB: string;
      answerC: string;
      answerD: string;
      correctAnswer: string;
    }[]
  >([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lockedAnswers, setLockedAnswers] = useState<string[]>([]);

  useEffect(() => {
    // Fetch the comprehension task
    ComprehensionTaskService.getActivityById("66dd62ad215ed140c1e126bf").then(
      (data) => {
        setPassage(data?.comprehensionTask?.passage);
        setQuestions(data?.comprehensionTask?.questions);
      }
    );
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

  const persist = () => {
    ComprehensionTaskService.updateActivityById("66dd62ad215ed140c1e126bf", {
      providedAnswers: lockedAnswers,
      status: "Completed",
      correctResponsesCount: calculateCorrectAnswers(),
    })
      .then((data) => {
        console.log("Persisted locked answers:", data);
        router.back();
      })
      .catch((error) => {
        console.error("Error persisting locked answers:", error);
      });
  };

  const calculateCorrectAnswers = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (question.correctAnswer === lockedAnswers[index]) {
        correctAnswers++;
      }
    });
    return correctAnswers;
  };

  return (
    <SafeAreaView className="flex-1 py-4 bg-gray-100 h-max-screen">
      <ComprehensionHeader
        title="Comprehension - Listening"
        subtitle="Listen to this amazing story!"
      />
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
            persist={persist}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            lockedAnswer={lockedAnswers[currentQuestionIndex]}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Listen;
