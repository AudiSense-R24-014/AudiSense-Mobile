import React from "react";
import { View, SafeAreaView } from "react-native";
import ComprehensionHeader from "@/components/organisms/ComprehensionHeader";
import CircleWave from "@/components/molecules/CircleWave";
import MCQModel from "@/components/organisms/MCQModel";

const Landing = () => {
  return (
    <View className="flex-1 bg-gray-100">
      <SafeAreaView className="flex-1 py-4">
        <ComprehensionHeader
          title="Comprehension - Level 1"
          subtitle="Listen to this amazing story!"
        />
        <View className="h-full">
          <CircleWave text="Mama just killed a man, mom's spaghetti, there's vomit on his sweater already. Snap back to reality. Wake up to reality, nothing lasts forever. Feel pain, accept pain, know pain. Those who do not know pain will never understand true peace." />
          <MCQModel />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Landing;
