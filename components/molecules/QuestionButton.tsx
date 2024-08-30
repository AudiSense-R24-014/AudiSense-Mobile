import React, { useEffect, useState } from "react";
import { Image, Platform, Pressable, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";
import * as Speech from "expo-speech";

const QuestionButton = ({ text }: { text: string }) => {
  const colors = ["#2379A4", "#327FA6", "#4860A6"];
  const [tts, setTts] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const PurpleBlueWave = require('../../assets/images/purple-blue-wave.png');

  useEffect(() => {
    if (Platform.OS == "ios") {
      setTts("com.apple.ttsbundle.siri_Nicky_en-US_compact");
    } else if (Platform.OS == "android") {
      setTts("Google UK English Male");
    } else {
      setTts("Google UK English Female");
    }
  });

  const toggleSpeech = () => {
    if (isSpeaking) { 
      Speech.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      Speech.speak(text, {
        voice: tts,
        rate: 0.9,
        onDone: () => {
          setIsSpeaking(false);
        },
      });
    }
  };

  return (
    <View>
      <View className="m-2 rounded-lg items-center justify-center">
        {isSpeaking &&
          colors.map((color, index) => {
            return (
              <MotiView
                key={index + 0}
                from={{ opacity: 1, scale: 1.2 }}
                animate={{ opacity: 0, scale: 2.1 }}
                transition={{
                  type: "timing",
                  easing: Easing.out(Easing.ease),
                  delay: index * 400,
                  duration: 2000,
                  loop: isSpeaking,
                }}
                style={{
                  position: "absolute",
                  width: 130,
                  height: 35,
                  borderRadius: 5,
                  backgroundColor: color,
                }}
              />
            );
          })}
        <Pressable
          className="bg-slate-400 px-4 p-2 rounded-lg flex-row items-center"
          onPress={toggleSpeech}
        >
          <Feather
            name={isSpeaking ? "stop-circle" : "play-circle"}
            size={40}
            color="white"
          />
          <Image source={PurpleBlueWave} className="h-10 w-36 mx-2"/>
        </Pressable>
      </View>
    </View>
  );
};

export default QuestionButton;
