import CustomButton from "@/components/atoms/CustomButton";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const GettingStarted = () => {
  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1 justify-between items-center p-4 bg-white">
        {/* Logo Section */}
        <View className="flex items-center justify-center mt-52">
          <Image
            source={require("../../assets/images/audisense-logo.png")}
            className="h-36 w-36 mb-4"
          />
        </View>

        {/* Get Started Button Section */}
        <TouchableOpacity
          className="w-full"
          onPress={() => router.push("/onboarding/landing")}
        >
          <CustomButton text="Get Started" buttonType="secondary" />
        </TouchableOpacity>

        {/* Powered by Section */}
        <Text className="text-xs font-inter-semibold text-audi-purple mb-4">
          Powered by Team AudiSense © 2024
        </Text>
      </SafeAreaView>
    </View>
  );
};

export default GettingStarted;
