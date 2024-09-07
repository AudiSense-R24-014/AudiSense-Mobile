import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, TouchableOpacity, Animated, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';
import IdentificationHeader from '@/components/organisms/IdentificationHeader';
import PlaybackBar from '@/components/molecules/PlaybackBar';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import taskService from '@/services/IdentificationTask.service';

const gradients: string[][] = [
  ["#F7C0E9", "#a6c1ee"],
  ["#F7C0E9", "#a6c1ee"],
  ["#F7C0E9", "#a6c1ee"],
  ["#F7C0E9", "#a6c1ee"],
];

const LevelOne = () => {
  const router = useRouter(); // Hook for navigation

  // State to track the task data
  const [tasks, setTasks] = useState<any[]>([]); // Handle multiple tasks
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0); // Track the current task index
  const [scales, setScales] = useState(gradients.map(() => new Animated.Value(1)));
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [clickSound, setClickSound] = useState<Audio.Sound | null>(null);

  // Simulating patient ID, replace with actual ID when available
  const patientID = "00010";

  // Function to fetch the task data based on patientID
  const fetchTaskData = async () => {
    try {
      const taskData = await taskService.getIdentificationLevelOneTaskByPatientId(patientID);
      setTasks(taskData); // Set all tasks at once
    } catch (error) {
      console.error("Error fetching task data:", error);
      Alert.alert("Error", "Failed to load tasks. Please try again.");
    }
  };

  useEffect(() => {
    fetchTaskData();
  }, []);

  // Function to play sound
  const playSound = async (soundUrl: string) => {
    try {
      if (!soundUrl) {
        throw new Error("Sound URL is missing");
      }

      console.log("Playing sound from URL:", soundUrl);

      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound, status } = await Audio.Sound.createAsync({ uri: soundUrl });
      
      if (status.isLoaded) {
        setSound(newSound);
        await newSound.playAsync();
      } else {
        console.error("Sound status indicates issues with loading or playback:", status);
        Alert.alert("Error", "Failed to load or play the sound.");
      }
    } catch (error) {
      console.error("Error loading or playing sound:", error);
      Alert.alert("Error", "Failed to load or play the sound.");
    }
  };

  // Function to play clicking sound
  const playClickSound = async () => {
    try {
      if (!clickSound) {
        const { sound: newClickSound } = await Audio.Sound.createAsync(require('@/assets/sounds/click.wav'));
        setClickSound(newClickSound);
      }
      await clickSound?.playAsync();
    } catch (error) {
      Alert.alert("Error", "Failed to load or play the click sound.");
    }
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
    playClickSound(); 
  };

  // Function to check if the selected answer is correct
  const handleAnswerSelection = (isCorrect: boolean) => {
    if (isCorrect) {
      Alert.alert("Correct!", "You selected the correct answer!", [
        {
          text: "Next",
          onPress: () => {
            if (currentTaskIndex < tasks.length - 1) {
              setCurrentTaskIndex(currentTaskIndex + 1); 
            } else {
              Alert.alert("Great!", "You have completed all tasks.");
            }
          },
        },
      ]);
    } else {
      Alert.alert("Oops", "Try again.");
    }
  };

  // Handle the play button click in PlaybackBar
  const handlePlayButtonClick = () => {
    if (tasks[currentTaskIndex]?.soundUrl) {
      playSound(tasks[currentTaskIndex].soundUrl);
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      <SafeAreaView className="flex-1 pt-6">
        <IdentificationHeader
          title="Identification - Level 1"
          subtitle="Hear, Identify and Choose the Correct Picture"
        >
          <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
            <MaterialIcons name="arrow-back" size={24} color="purple" />
          </TouchableOpacity>
        </IdentificationHeader>

        {/* Playback Bar */}
        <PlaybackBar
          onPlay={handlePlayButtonClick}
        />

        <View className="flex-1 mt-8">
          <View className="flex-7 justify-center items-center">
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
                    onPressOut={() => {
                      handlePressOut(index);
                      handleAnswerSelection(answer.Correct); 
                    }}
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
                          onError={(error) => {
                            Alert.alert("Error", "Failed to load the image.");
                          }}
                        />
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default LevelOne;
