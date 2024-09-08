import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Platform, Pressable } from 'react-native';
import * as Speech from 'expo-speech';
import { router } from "expo-router";
import QuestionButton from '@/components/molecules/QuestionButton';
import AnswerButton from '@/components/molecules/AnswerButton';
import DiscriminationTaskService from '@/services/DiscriminationTask.service';

const DiscriminationLevel1 = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);
  const [firstWord, setFirstWord] = useState("");
  const [secondWord, setSecondWord] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [status, setStatus] = useState("");
  

  useEffect(() => {
    DiscriminationTaskService.getDiscriminationTaskById("66db2163230c2790b39a8df3").then((data) => {
      setFirstWord(data?.word1);
      setSecondWord(data?.word2);
    });
  }, []);

  const handleRhymes=(firstWord:string, secondWord:string) => {
    let randomNumber=Math.floor(Math.random() * 2);
    let words = randomNumber == 0 ? [firstWord,secondWord] : [secondWord,firstWord];
    return (
        <View className="flex-col space-y-5 mb-5">
            {words.map((word, index) => (
                <Pressable className="mb-3 mt-2" onPress={()=>setSelectedAnswer(word)}>
                    <AnswerButton character={index.toString()} text={word} />
                </Pressable>
            ))}
      </View>
    )
  }
  const sleep = (ms:any) => new Promise((resolve) => setTimeout(resolve, ms));

  const saveProgress  = async () => {
    const feedback = {
      word1: firstWord,
      word2: secondWord,
      status: status,
      level: "1",
      patient:"Leo",
    };
    DiscriminationTaskService.saveDiscriminationActvityResponse(feedback)
      .then((data) => {
        console.log("Rhyming Words saved Successfully: ", data);
      })
      .catch((err) => {
        console.error("Error saving: ", err);
      });
  };

  //   const catSound = new Sound('cat.mp3', Sound.MAIN_BUNDLE, (error) => {
  //     if (error) {
  //       console.log('failed to load the sound', error);
  //     }
  //   });

  //   const handlePlaySound = () => {
  //     setIsPlaying(true);
  //     catSound.play((success) => {
  //       if (success) {
  //         console.log('successfully finished playing');
  //       } else {
  //         console.log('playback failed due to audio decoding errors');
  //       }
  //       setIsPlaying(false);
  //     });
  //   };

  //   const handleWordSelection = (word) => {
  //     setSelectedWord(word);
  //   };

  const [tts, setTts] = useState("");
  const checkAnswer = async () => {
    if (selectedAnswer == firstWord) {
      setStatus("completed");
      console.log("Correct Answer");
    }else{
      setStatus("failed");
      console.log("Incorrect Answer");
    }
    await sleep(3000);
    saveProgress();
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

      {/* <TouchableOpacity className={`flex-row items-center bg-gray-200 p-3 rounded-lg mb-4 ${isPlaying ? 'opacity-50' : ''}`} disabled={isPlaying}>
                <Image className="w-6 h-6 mr-2" />
                <Text className="text-sm">0:15</Text>
            </TouchableOpacity> */}
      <View>
        <QuestionButton text={firstWord} />
      </View>

      <Text className="text-xl font-bold mb-5 text-center self-center">{firstWord}</Text>
      {handleRhymes(firstWord, secondWord)}
      <View className="mt-20">
        <TouchableOpacity className="bg-purple-800 p-2 rounded-lg w-3/4 mx-auto" onPress={checkAnswer}>
          <Text className="text-center text-base text-white font-bold">Check</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DiscriminationLevel1;
