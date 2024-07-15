import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";

const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  type?: "text" | "password";
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="w-full mb-5">
      <Text className="mb-1 ml-1 font-inter-semibold text-sm">{label}</Text>
      <View
        className={`border rounded-lg overflow-hidden ${
          isFocused ? "border-audi-purple" : "border-secondary"
        }`}
      >
        <TextInput
          editable
          maxLength={40}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={onChangeText}
          underlineColorAndroid="transparent"
          placeholder={placeholder}
          secureTextEntry={type === "password"}
          className="px-3 py-3 text-audi-purple font-inter-regular"
          style={{ borderWidth: 0 }} // Ensures no border on iOS
        />
      </View>
    </View>
  );
};

export default CustomInput;
