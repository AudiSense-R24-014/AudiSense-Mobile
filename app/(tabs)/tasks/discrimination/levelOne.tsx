import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Platform, Pressable } from 'react-native';
import * as Speech from 'expo-speech';
import { router } from "expo-router";
import QuestionButton from '@/components/molecules/QuestionButton';
import AnswerButton from '@/components/molecules/AnswerButton';
import DiscriminationTaskService from '@/services/DiscriminationTask.service';
import AsyncStorage from "@react-native-async-storage/async-storage";

const DiscriminationLevel1 = () => {
  const [firstWord, setFirstWord] = useState("");
  const [secondWord, setSecondWord] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [status, setStatus] = useState("");
  const [patientID, setPatientID] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatientID = async () => {
      try {
        const storedPatientID = await AsyncStorage.getItem("audi-patient");
        if (storedPatientID) {
          setPatientID(JSON.parse(storedPatientID)?._id);
        }
      } catch (error) {
        console.error("Error retrieving patient from AsyncStorage:", error);
      }
    };

    fetchPatientID();
  }, []);

  useEffect(() => {
    if (patientID) {
      DiscriminationTaskService.getDiscriminationTaskById(patientID)
        .then((data) => {
          setFirstWord(data?.word1);
          setSecondWord(data?.word2);
        });
    }
  }, [patientID]);

  const handleRhymes = (firstWord: string, secondWord: string) => {
    let randomNumber = Math.floor(Math.random() * 2);
    let words = randomNumber == 0 ? [firstWord, secondWord] : [secondWord, firstWord];
    return (
      <View className="flex-col space-y-5 mb-5">
        {words.map((word, index) => (
          <Pressable className="mb-3 mt-2">
            <AnswerButton character={index.toString()} text={word} storeAnswer={() => setSelectedAnswer(word)} />
          </Pressable>
        ))}
      </View>
    )
  }


  const saveProgress = async (status: string) => {
    const feedback = {
      word1: firstWord,
      word2: secondWord,
      status: status,
      level: "1",
      patient: "Leo",
    };
    DiscriminationTaskService.saveDiscriminationActvityResponse(feedback)
      .then((data) => {
        console.log("Rhyming Words saved Successfully: ", data);
      })
      .catch((err) => {
        console.error("Error saving: ", err);
      });
  };


  const [tts, setTts] = useState("");
  const checkAnswer = async () => {
    if (selectedAnswer == firstWord) {
      saveProgress("completed");
      setStatus("completed");
      console.log("Correct Answer");
    } else {
      saveProgress("failed");
      setStatus("failed");
      console.log("Incorrect Answer");
    }
  }
  useEffect(() => {
    if (Platform.OS == "ios") {
      setTts("com.apple.eloquence.en-GB.Shelley")
    } else if (Platform.OS == "android") {
      setTts("Google UK English Male")
    } else {
      setTts("Google UK English Female")
    }
  })
  return (
    <View className="flex-1 bg-gray-100 p-5">
      <Text className="text-2xl font-bold mb-2 text-violet-800">Discrimination - Level 1</Text>
      <Text className="text-base mb-5">Hear, and Select the Correct Rhyming Words</Text>
      <View>
        <QuestionButton text={firstWord} />
      </View>

      <Text className="text-xl font-bold mb-5 text-center self-center">{firstWord}</Text>
      {handleRhymes(firstWord, secondWord)}
      <View className="mt-20">
      </View>
      <TouchableOpacity
        className={`bg-purple-800 p-2 rounded-lg w-3/4 mx-auto border ${status === "completed"
          ? "border-lime-500"
          : status === "failed"
            ? "border-red-400"
            : "border-transparent"}`}
        onPress={checkAnswer}
      >
        <Text className="text-center text-base text-white font-bold">Check</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DiscriminationLevel1;
