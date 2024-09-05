import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, Image,Platform } from 'react-native';
import * as Speech from 'expo-speech';
import { router } from "expo-router";

const DiscriminationLevel1 = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedWord, setSelectedWord] = useState(null);

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
    const kathakarapn=()=>{
        Speech.speak("Bomuda",{
      // voice: tts,
      rate:0.5
    });
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

            <TouchableOpacity className={`flex-row items-center bg-gray-200 p-3 rounded-lg mb-4 ${isPlaying ? 'opacity-50' : ''}`} disabled={isPlaying}>
                <Image className="w-6 h-6 mr-2" />
                <Text className="text-sm">0:15</Text>
            </TouchableOpacity>

            <Text className="text-xl font-bold mb-5 text-center self-center">Cat</Text>

            <View className="flex-col space-y-3 mb-5">
                <TouchableOpacity className={`bg-purple-300 p-4 rounded-lg flex-1 mr-2 ${selectedWord === 'hat' ? 'bg-gray-400' : ''}`}>
                    <Image className="mb-2 " source={require('../../../../assets/images/soundWave1.png')} />
                </TouchableOpacity>
                <TouchableOpacity className={`bg-purple-300 p-4 rounded-lg flex-1 mr-2 ${selectedWord === 'mat' ? 'bg-gray-400' : ''}`}onPress={()=>router.push("./levelTwo")}>

                </TouchableOpacity>
            </View>
            <View className="mt-20">
                <TouchableOpacity className="bg-purple-800 p-2 rounded-lg w-3/4 mx-auto" onPress={kathakarapn}>
                    <Text className="text-center text-base text-white font-bold">Check</Text>
                </TouchableOpacity>
            </View>

            {/* <View className="flex-row justify-around absolute bottom-5 w-full">
        <TouchableOpacity className="items-center">
          <Image  className="w-6 h-6 mb-1" />
          <Text className="text-xs">Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Image  className="w-6 h-6 mb-1" />
          <Text className="text-xs">Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Image  className="w-6 h-6 mb-1" />
          <Text className="text-xs">Profile</Text>
        </TouchableOpacity>
      </View> */}
        </View>
    );
};

export default DiscriminationLevel1;
