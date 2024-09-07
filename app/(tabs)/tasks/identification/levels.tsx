import React from "react";
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router"; // Import router for navigation

const Levels = () => {
  const router = useRouter(); // Hook for navigation

  return (
    <SafeAreaView className="flex-1">
      {/* Background Image */}
      <ImageBackground
        source={require("../../../../assets/images/background.png")} // Adjust the path based on your project structure
        className="flex-1 justify-center items-center"
        resizeMode="cover"
      >
        {/* Main Container */}
        <View className="bg-white bg-opacity-80 rounded-lg shadow-lg p-6 w-10/12">
          {/* Levels Title */}
          <Text className="text-4xl font-extrabold text-center text-orange-500 mb-4">
            Levels
          </Text>
          {/* Awareness Title */}
          <Text className="text-3xl font-bold text-center text-orange-500 mb-8">
            Identification
          </Text>

          {/* Levels Container */}
          <View className="flex-row justify-center space-x-6">
            {/* Level 1 - Touchable */}
            <TouchableOpacity
              className="bg-gray-200 rounded-lg p-4 items-center"
              onPress={() => router.push("/tasks/identification/game/levelOne")} // Navigate to Level 1
            >
              <Text className="text-2xl font-bold mt-2 text-gray-800">1</Text>
            </TouchableOpacity>

            {/* Level 2 - Touchable */}
            <TouchableOpacity
              className="bg-gray-200 rounded-lg p-4 items-center"
              onPress={() => router.push("/tasks/identification/game/levelTwo")} // Navigate to Level 2
            >
              <Text className="text-2xl font-bold mt-2 text-gray-800">2</Text>
            </TouchableOpacity>

            {/* Locked Level */}
            <View className="bg-gray-200 rounded-lg p-4 items-center">
              <Text className="text-2xl font-bold mt-2 text-gray-800">🔒</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Levels;
