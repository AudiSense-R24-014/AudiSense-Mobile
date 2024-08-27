import React, { useEffect, useState } from "react";
import { Image, Platform, Pressable, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";
import * as Speech from "expo-speech";
import PlainWave from "../../assets/images/plain-wave.png";
import { LinearGradient } from "expo-linear-gradient";

const AnswerButton = ({ text }: { text: string }) => {
  const colors = ["#A991D2", "#F7C0E9"];
  const [tts, setTts] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

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
      <View className="rounded-lg items-center m-2 justify-center">
        {isSpeaking &&
          colors.map((color, index) => {
            return (
              <MotiView
                key={index + 0}
                from={{ opacity: 1, scale: 1.2 }}
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
          onPress={toggleSpeech}
        >
          <LinearGradient
            colors={["#A991D2", "#F7C0E9"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1.2, y: 0 }}
            className="p-2 rounded-lg flex-row items-center"
          >
            <Text className="font-inter-medium text-xl text-white">A:</Text>
            <Image source={PlainWave} className="h-10 w-20 mx-2" />
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
};

export default AnswerButton;
