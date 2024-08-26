import CustomButton from "@/components/atoms/CustomButton";
import { router } from "expo-router";
import React from "react";
import { View, Text, SafeAreaView, Pressable } from "react-native";

const Levels = () => {
  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1 items-center p-4">
        <Text>Levels</Text>
        <Pressable onPress={()=>{router.push("/tasks/comprehension/game")}}>
        <CustomButton buttonType="primary" text="Test Level" /></Pressable>
      </SafeAreaView>
    </View>
  );
};

export default Levels;
