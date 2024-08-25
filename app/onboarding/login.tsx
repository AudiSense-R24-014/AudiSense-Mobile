import CustomButton from "@/components/atoms/CustomButton";
import CustomInput from "@/components/atoms/CustomInput";
import { router } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1 items-center p-4 justify-between">
        <View className="mt-20 w-full">
          <CustomInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
          />
          <CustomInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            type="password"
          />
        </View>
        <TouchableOpacity
          className="w-full"
          onPress={() => router.push("/dashboard")}
        >
          <CustomButton text="Login" buttonType="primary" />
        </TouchableOpacity>
        <View className="flex items-center mb-10">
          <Text className="font-inter-semibold text-secondary">Don't Have an Account?</Text>
          <Text className="font-inter-semibold text-audi-purple">Request from Your Audiologist</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Login;
