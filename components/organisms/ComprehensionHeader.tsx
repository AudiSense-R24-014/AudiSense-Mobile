import React from "react";
import { View, Text } from "react-native";

type ComprehensionHeaderProps = {
  title: string;
  subtitle?: string;
};

const ComprehensionHeader = ({ title, subtitle }: ComprehensionHeaderProps) => {
  return (
    <View>
      <View className="flex-row items-center p-2">
        <View>
          <Text className="text-2xl font-inter-bold text-audi-purple">
            {title}
          </Text>
        </View>
        <View></View>
      </View>
      <View className="p-3 self-center">
        {subtitle && (
          <Text className="font-inter-semibold text-base text-gray-700/50 ">
            {subtitle}
          </Text>
        )}
      </View>
    </View>
  );
};

export default ComprehensionHeader;
