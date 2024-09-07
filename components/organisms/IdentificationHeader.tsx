import React from "react";
import { View, Text } from "react-native";

type IdentificationHeaderProps = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode; // To accept children (e.g., back button)
};

const IdentificationHeader = ({ title, subtitle, children }: IdentificationHeaderProps) => {
  return (
    <View className="p-4">  
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          {/* Render children like a back button, ensuring proper handling */}
          {children && (
            <View className="mr-4">
              {children}
            </View>
          )}
          {/* Title Text */}
          <Text className="text-2xl font-inter-bold text-audi-purple">
            {title}
          </Text>
        </View>
      </View>

      {/* Subtitle Text */}
      {subtitle && (
        <View className="mt-2 self-center">
          <Text className="font-inter-semibold text-base text-gray-700/50">
            {subtitle}
          </Text>
        </View>
      )}
    </View>
  );
};

export default IdentificationHeader;
