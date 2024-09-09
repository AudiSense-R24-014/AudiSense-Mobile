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
import { useRouter } from "expo-router";

const gradients: string[][] = [
  ["#F7C0E9", "#a6c1ee"],
  ["#F7C0E9", "#a6c1ee"],
  ["#F7C0E9", "#a6c1ee"],
  ["#F7C0E9", "#a6c1ee"],
];

const LevelOne = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const [tasks, setTasks] = useState<any[]>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [scales, setScales] = useState(gradients.map(() => new Animated.Value(1)));
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [isAllTasksCompleted, setIsAllTasksCompleted] = useState(false);

  const patientID = "66de59882283afc1239ac123";

  useEffect(() => {
    fetchTaskData();
    return () => {
      sound?.unloadAsync();
    };
  }, []);

  const fetchTaskData = async () => {
    try {
      const taskData = await taskService.getIdentificationLevelOneTaskByPatientId(patientID);
      setTasks(taskData);

      const allTasksCompleted = taskData.every((task: any) => task.response === true);
      setIsAllTasksCompleted(allTasksCompleted);

      console.log("Fetched Tasks:", taskData);
      console.log("All Tasks Completed:", allTasksCompleted);
    } catch (error) {
      console.error("Error fetching task data:", error);
      setModalMessage("Failed to load tasks. Please try again.");
      setModalVisible(true);
    }
  };

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
      console.error("Error playing sound:", error);
      setModalMessage("Failed to load or play the sound.");
      setModalVisible(true);
    }
  };

  const handlePlayButtonClick = () => {
    const currentTask = tasks[currentTaskIndex];
    if (currentTask?.soundUrl) {
      playSound(currentTask.soundUrl);
    }
  };

  const handleAnswerSelection = async (isCorrect: boolean, answerId: string) => {
    setIsCorrectAnswer(isCorrect);
    setModalMessage(isCorrect ? "Correct! Well done!" : "Oops, try again.");
    setModalVisible(true);

    if (isCorrect) {
      const data = {
        response: true,
      };
      try {
        await taskService.updateAnswerLevel1(tasks[currentTaskIndex]._id, data);

        // Update the task response in local state
        const updatedTasks = tasks.map((task, index) =>
          index === currentTaskIndex ? { ...task, response: true } : task
        );
        setTasks(updatedTasks);

        const allCompleted = updatedTasks.every((task) => task.response === true);
        setIsAllTasksCompleted(allCompleted);

        console.log("Updated Tasks:", updatedTasks);
        console.log("All Tasks Completed After Update:", allCompleted);
      } catch (error) {
        console.error("Error updating answer:", error);
        setModalMessage("Failed to record your answer. Please try again.");
        setModalVisible(true);
      }
    }
  };

  const goToNextTask = () => {
    setModalVisible(false);
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    } else {
      handleCompleteAllTasks();
    }
  };

  const handleCompleteAllTasks = async () => {
    try {
      const taskIds = tasks.map((task) => task._id);
      await taskService.updateAnswerLevel1(taskIds, { response: true });
      setIsAllTasksCompleted(true);
      setModalMessage("Great! You have completed all tasks.");
      setModalVisible(true);
      handleContinueButtonPress();
    } catch (error) {
      setModalMessage("Failed to mark all tasks as completed.");
      setModalVisible(true);
    }
  };

  const goToPreviousTask = () => {
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex(currentTaskIndex - 1);
    }
  };

  const retryCurrentTask = () => {
    setModalVisible(false);
  };

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

  const handleContinueButtonPress = () => {
    // Ensure the user can only move to the next level if all tasks are correctly answered
    const allTasksCompleted = tasks.every((task) => task.response === true);
    
    if (allTasksCompleted) {
      setIsAllTasksCompleted(true);
      router.push("/tasks/identification/game/levelTwo");
    } else {
      setIsAllTasksCompleted(false);
      setModalMessage("Please complete all tasks before going to the next level.");
      setModalVisible(true);
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      <SafeAreaView className="flex-1 pt-6">
        <IdentificationHeader
          title="Identification - Level 1"
          subtitle="Hear, Identify and Choose the Correct Picture"
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mr-4"
          >
            <MaterialIcons name="arrow-back" size={24} color="purple" />
          </TouchableOpacity>
        </IdentificationHeader>

        <PlaybackBar onPlay={handlePlayButtonClick} />

        <View className="flex-7 justify-center items-center relative mt-12">
          {currentTaskIndex > 0 && (
            <TouchableOpacity
              onPress={goToPreviousTask}
              className="absolute left-0 px-3 justify-center"
              style={{ top: "50%" }}
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
                  { width: "38%", aspectRatio: 1 },
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
                    <View className="w-full h-full">
                      <Animated.Image
                        source={{ uri: answer.ImgUrl }}
                        className="w-full h-full"
                        resizeMode="contain"
                      />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>

          {currentTaskIndex < tasks.length - 1 && (
            <TouchableOpacity
              onPress={goToNextTask}
              className="absolute right-0 py-13 px-2 justify-right"
              style={{ top: "50%" }}
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

export default LevelOne;