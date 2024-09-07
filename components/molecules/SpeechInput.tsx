import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";
import { Audio } from "expo-av";

const SpeechInput = ({
  lockRecording,
  recordedAudio,
}: {
  lockRecording: (recording: any) => void;
  recordedAudio: any;
}) => {
  const colors = ["#4860A6", "#327FA6", "#2379A4"];
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recordingAudio, setRecordingAudio] = useState<any>();
  const [recording, setRecording] = useState<{
    sound: any;
    duration: string;
    file: any;
  }>(recordedAudio);

  const toggleSpeech = () => {
    if (isSpeaking) {
      setIsSpeaking(false);
      stopRecording();
    } else {
      setIsSpeaking(true);
      startRecording();
    }
  };

  async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync();
        setRecordingAudio(recording);
      }
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    await recordingAudio.stopAndUnloadAsync();
    const { sound, status } = await recordingAudio.createNewLoadedSoundAsync();
    const newRecording = {
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recordingAudio.getURI(),
    };
    setRecordingAudio(undefined);
    setRecording(newRecording);
    lockRecording(newRecording);
  }
  function getDurationFormatted(milliseconds: any) {
    const minutes = milliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return seconds < 10
      ? `${Math.floor(minutes)}:0${seconds}`
      : `${Math.floor(minutes)}:${seconds}`;
  }
  function reload() {
    setIsSpeaking(false);
    setRecording({ sound: null, duration: "", file: null });
    lockRecording(null);
  }

  const playRecorded = () => {
    if (recording) {
      recording.sound.replayAsync();
    }
  };

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
          className={`bg-audi-blue p-8 rounded-full  ${
            recordedAudio != null && "border-green-200 border-4"
          }`}
          onPress={toggleSpeech}
        >
          <Feather name="mic" size={30} color="white" />
        </Pressable>
      </View>
      <View className="flex-row -mt-9">
        <Pressable
          className="bg-slate-900 p-2 mx-1 rounded-full"
          onPress={reload}
        >
          <Feather name={"rotate-ccw"} size={25} color="white" />
        </Pressable>
        <Pressable
          className="bg-slate-900 py-2 pl-2.5 pr-1.5 rounded-full mx-1 "
          onPress={playRecorded}
        >
          <Feather name={"play"} size={25} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

export default SpeechInput;
