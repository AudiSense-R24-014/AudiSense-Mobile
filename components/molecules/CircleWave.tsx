import React, { useEffect, useState } from "react";
import { Platform, Pressable, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";
import * as Speech from "expo-speech";

const CircleWave = ({ text }: { text: string }) => {
  const colors = ["#6C26A6", "#5A3DA6", "#4860A6", "#327FA6", "#2379A4"];
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [chunks, setChunks] = useState<string[]>([]);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);

  useEffect(() => {
    let cnk = text.split(/(?<=[,.])/);
    setChunks(cnk);
  }, []);

  const toggleSpeech = () => {
    if (Platform.OS == "ios") {
      if (isSpeaking) {
        Speech.pause();
        setIsPaused(true);
        setIsSpeaking(false);
      } else if (isPaused) {
        Speech.resume();
        setIsSpeaking(true);
        setIsPaused(false);
      } else {
        setIsSpeaking(true);
        setIsPaused(false);
        Speech.speak(text, {
          rate: 0.9,
        });
      }
    } else {
      console.log("Android or Web");
      if (isSpeaking) {
        Speech.stop();
        setIsPaused(true);
        setIsSpeaking(false);
      } else {
        setIsSpeaking(true);
        playChunk(currentChunkIndex);
        setIsPaused(false);
      }
    }
  };

  const playChunk = (index: number) => {
    if (index >= chunks.length) {
      reload();
      return;
    }

    Speech.stop(); // Stop any current speech before starting a new one
    Speech.speak(chunks[index], {
      rate: 0.9,
      onDone: () => {
        setCurrentChunkIndex(index + 1);
        playChunk(index + 1); // Play the next chunk
      },
    });
  };

  function reload() {
    setCurrentChunkIndex(0);
    Speech.stop();
    setIsPaused(false);
    setIsSpeaking(false);
  }

  return (
    <View className="flex -mt-9 items-center">
      <View className="w-52 h-52 rounded-lg items-center justify-center">
        {isSpeaking &&
          colors.map((color, index) => {
            return (
              <MotiView
                key={index + 0}
                from={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 0, scale: 4 }}
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
          className="bg-audi-purple p-4 rounded-full"
          onPress={toggleSpeech}
        >
          <Feather
            name={isSpeaking && !isPaused ? "pause-circle" : "play-circle"}
            size={60}
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

export default CircleWave;
