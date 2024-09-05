import React, { useEffect, useState } from "react";
import { Platform, Pressable, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";

const SpeechInput = () => {
  const colors = ["#4860A6", "#327FA6", "#2379A4"];
  const [isSpeaking, setIsSpeaking] = useState(false);

  const toggleSpeech = () => {
    if (isSpeaking) {
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
    }
  };

  function reload() {
    setIsSpeaking(false);
  }

  return (
    <View className="flex items-center">
      <View className="w-52 h-52 rounded-lg items-center justify-center">
        {isSpeaking &&
          colors.map((color, index) => {
            return (
              <MotiView
                key={index + 0}
                from={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 0, scale: 2.5 }}
                transition={{
                  type: "timing",
                  easing: Easing.out(Easing.ease),
                  delay: index * 400,
                  duration: 2000,
                  loop: isSpeaking,
                }}
                style={{
                  position: "absolute",
                  width: 60,
                  height: 60,
                  borderRadius: 100,
                  backgroundColor: color,
                }}
              />
            );
          })}
        <Pressable
          className="bg-audi-blue p-8 rounded-full"
          onPress={toggleSpeech}
        >
          <Feather
            name= "mic"
            size={30}
            color="white"
          />
        </Pressable>
      </View>
      <Pressable
        className="bg-slate-900 p-2 -mt-9 rounded-full"
        onPress={reload}
      >
        <Feather name={"rotate-ccw"} size={25} color="white" />
      </Pressable>
    </View>
  );
};

export default SpeechInput;
