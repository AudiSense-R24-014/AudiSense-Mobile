import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";
import * as Speech from "expo-speech";
import { LinearGradient } from "expo-linear-gradient";

const AnswerButton = ({
  text,
  character,
  storeAnswer,
}: {
  text: string;
  character: string;
  storeAnswer?: () => void;
}) => {
  const colors = ["#A991D2", "#F7C0E9"];
  const [isSpeaking, setIsSpeaking] = useState(false);
  const PlainWave = require("../../assets/images/plain-wave.png");

  const toggleSpeech = () => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      Speech.speak(text, {
        rate: 0.9,
        onDone: () => {
          setIsSpeaking(false);
        },
      });
    }
  };

  return (
    <View>
      <View className="rounded-lg items-center justify-center">
        {isSpeaking &&
          colors.map((color, index) => {
            return (
              <MotiView
                key={index + 0}
                from={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 0, scale: 2 }}
                transition={{
                  type: "timing",
                  easing: Easing.out(Easing.ease),
                  delay: index * 400,
                  duration: 2000,
                  loop: isSpeaking,
                }}
                style={{
                  position: "absolute",
                  width: 100,
                  height: 44,
                  borderRadius: 5,
                  backgroundColor: color,
                }}
              />
            );
          })}
        <Pressable
          className="rounded-lg flex-row items-center"
          onPress={() => {
            toggleSpeech();
            storeAnswer && storeAnswer();
          }}
        >
          <LinearGradient
            colors={["#A991D2", "#F7C0E9"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1.2, y: 0 }}
            className="p-2 rounded-lg flex-row items-center"
          >
            <Text className="font-inter-medium text-xl text-white">
              {character}:
            </Text>
            <Image source={PlainWave} className="h-10 w-20 mx-2" />
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
};

export default AnswerButton;
