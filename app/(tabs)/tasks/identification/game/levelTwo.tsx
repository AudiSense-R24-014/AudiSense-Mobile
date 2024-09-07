import React, { useState } from "react";
import { View, SafeAreaView, TouchableOpacity, Animated } from "react-native";
import { Audio, PlaybackStatus } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import IdentificationHeader from "@/components/organisms/IdentificationHeader";
import { MaterialIcons } from '@expo/vector-icons';
import PlaybackBar from "@/components/molecules/PlaybackBar";
import { LinearGradient } from "expo-linear-gradient";

// Gradient colors for the cards
const gradients: string[][] = [
  ["#F7C0E9", "#a6c1ee"],
  ["#F7C0E9", "#a6c1ee"],
  ["#F7C0E9", "#a6c1ee"],
  ["#F7C0E9", "#a6c1ee"],
];

const LevelTwo = () => {
  const navigation = useNavigation();

  // State to track the scale of each card
  const [scales, setScales] = useState(() =>
    gradients.map(() => new Animated.Value(1))
  );

  // Function to handle press in and out
  const handlePressIn = (index: number) => {
    Animated.spring(scales[index], {
      toValue: 1.1, // Scale up
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (index: number) => {
    Animated.spring(scales[index], {
      toValue: 1, // Scale back to normal
      useNativeDriver: true,
    }).start();
  };

  // Function to play cards effect sound
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../../../../assets/sounds/click.wav')
    );
    
    await sound.playAsync();

    // Unload the sound after it plays to avoid memory leaks
    sound.setOnPlaybackStatusUpdate((status: PlaybackStatus) => {
      if (status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  };

  return (
    <View className="flex-1 bg-gray-100">
      <SafeAreaView className="flex-1 pt-6">
        {/* Identification Header with Back Button */}
        <IdentificationHeader
          title="Identification - Level 2"
          subtitle="Hear, Identify and Choose the Correct Picture"
        >
          {/* Back Button */}
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
            <MaterialIcons name="arrow-back" size={24} color="purple" />
          </TouchableOpacity>
        </IdentificationHeader>

        {/* Playback Bar */}
        <PlaybackBar />

        {/* Card Section */}
        <View className="flex-1 mt-8">
          <View className="flex-6 justify-center items-center">
            {gradients.map((gradient, index) => (
              <Animated.View
                key={index}
                className="p-2"
                style={[
                  { width: "80%", height: 100 }, // Adjust width and height for rectangular shape
                  { transform: [{ scale: scales[index] }] }
                ]}
              >
                <TouchableOpacity
                  onPressIn={() => {
                    handlePressIn(index);
                    playSound(); // Play sound when card is pressed
                  }}
                  onPressOut={() => handlePressOut(index)}
                  className="w-full h-full rounded-lg overflow-hidden"
                >
                  <LinearGradient
                    colors={gradient}
                    className="w-full h-full flex justify-center items-center"
                  >
                    {/* Empty card content */}
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default LevelTwo;
