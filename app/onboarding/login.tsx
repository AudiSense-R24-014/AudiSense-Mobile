import CustomButton from "@/components/atoms/CustomButton";
import CustomInput from "@/components/atoms/CustomInput";
import UserService from "@/services/User.service";
import { router } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        try {
            const response = await UserService.patientLogin(email, password);
            if (response.user && response.password) {
                // Save data to AsyncStorage
                await AsyncStorage.setItem("audi-patient", JSON.stringify(response?.patient));
                await AsyncStorage.setItem("audi-token", response?.token);
                router.push("/dashboard");
            } else {
                alert("Invalid Credentials");
            }
        } catch (error) {
            console.log(error);
            alert("Error Connecting to Server");
        }
    };

    return (
        <View className="flex-1 bg-white">
            <SafeAreaView className="flex-1 items-center p-4 justify-between">
                <View className="mt-20 w-full">
                    <CustomInput
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email"
                    />
                    <CustomInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Password"
                        type="password"
                    />
                </View>
                <TouchableOpacity className="w-full" onPress={login}>
                    <CustomButton text="Login" buttonType="primary" />
                </TouchableOpacity>
                <View className="flex items-center mb-10">
                    <Text className="font-inter-semibold text-secondary">
                        Don't Have an Account?
                    </Text>
                    <Text className="font-inter-semibold text-audi-purple">
                        Request from Your Audiologist
                    </Text>
                </View>
            </SafeAreaView>
        </View>
    );
};

export default Login;
