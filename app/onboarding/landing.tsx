import { router } from "expo-router";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButton from "@/components/atoms/CustomButton";

const Landing = () => {
  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1 justify-between items-center p-4">
        {/* Welcome Section */}
        <View className="flex items-center mt-20">
          <Image
            source={require("../../assets/images/landing-penguin.png")}
            className="h-86 w-86 mb-4"
          />
          <View>
            <View className="flex items-center m-1">
              <Text className="text-lg font-inter-bold text-audi-purple">
                Welcome to AudiSense
              </Text>
            </View>
            <View className="flex items-center m-0.5">
              <Text className="text-sm font-inter-regular text-secondary">
                Introducing Sound to Silent Worlds
              </Text>
            </View>
          </View>
        </View>
        {/* Button Section */}
        <View className="w-full mb-6">
          <TouchableOpacity
            className="w-full"
            onPress={() => router.push("/onboarding/login")}
          >
            <CustomButton text="Login" buttonType="primary" />
          </TouchableOpacity>

          <View className="flex-row items-center justify-center m-5">
            <Ionicons
              name="remove-outline"
              size={24}
              color="#5E5B5B"
              style={{ marginRight: -10 }}
            />
            <Ionicons name="remove-outline" size={24} color="#5E5B5B" />
            <Text className="text-xs font-inter-regular text-secondary text-center">
              Don't Have an Account?
            </Text>
            <Ionicons name="remove-outline" size={24} color="#5E5B5B" />
            <Ionicons
              name="remove-outline"
              size={24}
              color="#5E5B5B"
              style={{ marginLeft: -10 }}
            />
          </View>
          <View className="w-full">
            <TouchableOpacity
              className="w-full"
              onPress={() => router.push("/onboarding/login")}
            >
              <CustomButton text="Request" buttonType="secondary" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Landing;
