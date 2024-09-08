import ComprehensionHeader from "@/components/organisms/ComprehensionHeader";
import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For back button icon

const Levels = () => {
  return (
    <View className="flex-1 bg-white">
      <ImageBackground
        source={require("../../../../assets/images/background.png")} // Adjust the path based on your project structure
        className="flex-1"
        resizeMode="cover"
      >
        <SafeAreaView className="flex-1">
          {/* Custom Top Bar */}
          <View className="flex-row items-center justify justify-between py-8 px-2 shadow-lg">
            {/* Back Button */}
            <Pressable onPress={() => router.back()} className="pt-2">
              <Ionicons name="arrow-back" size={25} color="orange" />
            </Pressable>

            {/* Title */}
            <Text className="text-amber-500 text-3xl font-sevillana">
              Comprehension Tasks
            </Text>
            <View className="px-2"/>
          </View>

          {/* Main Content */}
          <View className="flex-1 items-center space-y-6">
            {/* Play Now Button */}
            <Pressable
              onPress={() => router.push("/tasks/comprehension/game")}
              className="bg-slate-900 py-3 px-6 w-5/6 rounded-lg shadow-md border border-rose-600"
            >
              <Text className="text-rose-400 text-2xl font-inter-semibold">Comprehension Activity 🎮</Text>
              <Text className="text-gray-500 text-base font-semibold">Level 1 - Listening</Text>
              <Text className="text-gray-300 text-base font-semibold">Incomplete</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/tasks/comprehension/game")}
              className="bg-slate-900 py-3 px-6 w-5/6 rounded-lg shadow-md border border-emerald-600"
            >
              <Text className="text-emerald-400 text-2xl font-inter-semibold">Comprehension Activity 🎮</Text>
              <Text className="text-gray-500 text-base font-semibold">Level 2 - Speech</Text>
              <Text className="text-gray-300 text-base font-semibold">Incomplete</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default Levels;
