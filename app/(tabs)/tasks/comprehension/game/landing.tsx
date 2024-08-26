import React from "react";
import { View, SafeAreaView } from "react-native";
import ComprehensionHeader from "@/components/organisms/ComprehensionHeader";
import CircleWave from "@/components/molecules/CircleWave";

const Landing = () => {
  return (
    <View className="flex-1 bg-gray-100">
      <SafeAreaView className="flex-1 py-4">
        <ComprehensionHeader
          title="Comprehension - Level 1"
          subtitle="Listen to this amazing story!"
        />
        <CircleWave text="Once upon a time achchi biwwa wine" />
      </SafeAreaView>
    </View>
  );
};

export default Landing;
