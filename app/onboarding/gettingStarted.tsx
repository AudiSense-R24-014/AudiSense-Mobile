import { Link } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
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
        <View className="w-full">
          <View className="border rounded-lg overflow-hidden items-center border-audi-purple">
            <Link href="/onboarding/landing" className="px-4 py-4">
              <Text className="text-audi-purple font-inter-semibold text-center text-sm">
                Get Started
              </Text>
            </Link>
          </View>
        </View>

        {/* Powered by Section */}
        <Text className="text-xs font-inter-semibold text-audi-purple mb-4">
          Powered by Team AudiSense © 2024
        </Text>
      </SafeAreaView>
    </View>
  );
};

export default GettingStarted;
