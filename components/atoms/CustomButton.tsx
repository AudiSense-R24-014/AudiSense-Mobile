import React from "react";
import { View, Text } from "react-native";

const CustomButton = ({
  text,
  buttonType,
}: {
  text: string;
  buttonType: string;
}) => {
  // Determine styles based on buttonType
  let backgroundColorClass, textColorClass;
  if (buttonType === "secondary") {
    backgroundColorClass = "bg-white";
    textColorClass = "text-audi-purple";
  } else {
    backgroundColorClass = "bg-audi-purple";
    textColorClass = "text-white";
  }

  return (
    <View
      className={`w-full border-audi-purple border rounded-lg overflow-hidden items-center ${backgroundColorClass}`}
    >
      <View className="px-4 py-4">
        <Text className={`font-inter-semibold text-sm ${textColorClass}`}>
          {text}
        </Text>
      </View>
    </View>
  );
};

export default CustomButton;
