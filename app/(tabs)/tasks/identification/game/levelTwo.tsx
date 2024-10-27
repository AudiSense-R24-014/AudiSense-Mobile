import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Text,
} from "react-native";
import { Audio } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import IdentificationHeader from "@/components/organisms/IdentificationHeader";
import PlaybackBar from "@/components/molecules/PlaybackBar";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Modal from "react-native-modal";
import taskService from "@/services/IdentificationTask.service";

// Define gradients for the card backgrounds
const gradients: string[][] = [
  ["#F7C0E9", "#a6c1ee"],
  ["#F7C0E9", "#a6c1ee"],
  ["#F7C0E9", "#a6c1ee"],
  ["#F7C0E9", "#a6c1ee"],
];

const LevelTwo = () => {
  const navigation = useNavigation();

  // State variables
  const [tasks, setTasks] = useState<any[]>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [scales, setScales] = useState(gradients.map(() => new Animated.Value(1)));
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  const patientID = "66de59882283afc1239ac123";

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTaskData();

    return () => {
      sound?.unloadAsync();
    };
  }, []);

  // Fetch task data from the server
  const fetchTaskData = async () => {
    try {
      const taskData = await taskService.getIdentificationLevelTwoTaskByPatientId(patientID);
      setTasks(taskData);
    } catch (error) {
      setModalMessage("Failed to load tasks. Please try again.");
      setModalVisible(true);
    }
  };

  // Play sound given its URL
  const playSound = async (soundUrl: string) => {
    try {
      if (!soundUrl) throw new Error("Sound URL is missing");

      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound, status } = await Audio.Sound.createAsync({
        uri: soundUrl,
      });
      setSound(newSound);

      if (status.isLoaded) {
        await newSound.playAsync();
      }
    } catch (error) {
      setModalMessage("Failed to load or play the sound.");
      setModalVisible(true);
    }
  };

  // Handle the play button click to play the sound
  const handlePlayButtonClick = () => {
    const currentTask = tasks[currentTaskIndex];
    if (currentTask?.soundUrl) {
      playSound(currentTask.soundUrl);
    }
  };

  // Handle answer selection
  const handleAnswerSelection = async (isCorrect: boolean, answerId: string) => {
    setIsCorrectAnswer(isCorrect);
    setModalMessage(isCorrect ? "Correct! Well done!" : "Oops, try again.");
    setModalVisible(true);

    if (isCorrect) {
      const data = {
        response: true
      };
      try {
        await taskService.updateAnswerLevel2(tasks[currentTaskIndex]._id, data);
      } catch (error) {
        setModalMessage("Failed to record your answer. Please try again.");
        setModalVisible(true);
      }
    }
  };

  // Move to the next task
  const goToNextTask = () => {
    setModalVisible(false);
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    } else {
      setModalMessage("Great! You have completed all tasks.");
      setModalVisible(true);
    }
  };

  // Move to the previous task
  const goToPreviousTask = () => {
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex(currentTaskIndex - 1);
    }
  };

  // Retry the current task
  const retryCurrentTask = () => {
    setModalVisible(false);
  };

  // Handle button press animations
  const handlePressIn = (index: number) => {
    Animated.spring(scales[index], {
      toValue: 1.1,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (index: number) => {
    Animated.spring(scales[index], {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  // Capitalize the first letter of a string
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <View className="flex-1 bg-gray-100">
      <SafeAreaView className="flex-1 pt-6">
        <IdentificationHeader
          title="Identification - Level 2"
          subtitle="Hear, Identify and Choose the Correct Label"
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mr-4"
          >
            <MaterialIcons name="arrow-back" size={24} color="purple" />
          </TouchableOpacity>
        </IdentificationHeader>

        <PlaybackBar onPlay={handlePlayButtonClick} onEnd={goToNextTask} />

        <View className="flex-6 justify-center items-center relative mt-8">
          {currentTaskIndex > 0 && (
            <TouchableOpacity
              onPress={goToPreviousTask}
              className="absolute left-0 px-3 justify-center"
              style={{ top: '50%' }} 
            >
              <MaterialIcons name="arrow-back-ios" size={30} color="gray" />
            </TouchableOpacity>
          )}

          <View className="flex-row flex-wrap justify-center">
            {tasks[currentTaskIndex]?.answers.map((answer: any, index: number) => (
              <Animated.View
                key={answer._id}
                className="p-2"
                style={[
                  { width: '80%', height: 100 },
                  { transform: [{ scale: scales[index] }] },
                ]}
              >
                <TouchableOpacity
                  onPressIn={() => handlePressIn(index)}
                  onPressOut={() => handlePressOut(index)}
                  onPress={() => handleAnswerSelection(answer.Correct, answer._id)}
                  className="w-full h-full rounded-lg overflow-hidden"
                >
                  <LinearGradient
                    colors={gradients[index % gradients.length]}
                    className="w-full h-full flex justify-center items-center"
                  >
                    <Text className="text-3xl font-bold text-white">
                      {capitalizeFirstLetter(answer.Label)}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>

          {currentTaskIndex < tasks.length - 1 && (
            <TouchableOpacity
              onPress={goToNextTask}
              className="absolute right-0 py-10 px-2 justify-right"
              style={{ top: '40%' }} 
            >
              <MaterialIcons name="arrow-forward-ios" size={30} color="purple" />
            </TouchableOpacity>
          )}
        </View>

        <Modal isVisible={isModalVisible}>
          <View className="bg-white p-5 rounded-lg items-center">
            <Text className="text-lg font-bold text-center mb-5">
              {modalMessage}
            </Text>

            {isCorrectAnswer ? (
              <TouchableOpacity
                onPress={goToNextTask}
                className="bg-purple-600 py-2 px-4 rounded-lg"
              >
                <Text className="text-white font-bold">Continue</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={retryCurrentTask}
                className="bg-yellow-600 py-2 px-4 rounded-lg"
              >
                <Text className="text-white font-bold">Retry</Text>
              </TouchableOpacity>
            )}
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
};

export default LevelTwo;
