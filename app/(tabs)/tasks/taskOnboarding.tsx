import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import DashboardHeader from "@/components/organisms/DashboardHeader";

const TaskOnboarding = () => {
  // TODO: Replace with user's name
  const name = "Leo";
  const title = `Hello Little ` + name + ` !`;

  return (
    <View className="flex-1 bg-gray-100">
      <SafeAreaView className="flex-1">
        <DashboardHeader title={title} />
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Text className="text-lg font-inter-semibold mb-4">
            Let's Begin Your Hearing Journey Here
          </Text>

          <Pressable onPress={() => router.push("/tasks/awareness/levels")} className="mb-1">
            <LinearGradient
              colors={["#EC6F9E", "#EC8B6A"]}
              className="rounded-lg p-6 mb-4 h-36 justify-center relative"
            >
              <Image
                source={require("../../../assets/images/childrenPlay.png")}
                className="absolute bottom-0 -right-4 w-1/2 h-full"
              />
              <TouchableOpacity className="absolute top-8 left-8">
                <Image
                  source={require("../../../assets/images/restartIcon.png")}
                  className="w-12 h-11 -top-3 -left-4"
                />
              </TouchableOpacity>
              <View style={{ position: "absolute", bottom: 8, left: 16 }}>
                <Text className="text-inter-bold text-white mb-4 top-3">
                  COMPLETED
                </Text>
                <Text className="text-inter-regular text-white text-xl">
                  Awareness
                </Text>
              </View>
            </LinearGradient>
          </Pressable>

          <Pressable
            onPress={() => router.push("/tasks/discrimination/levels")}
            className="mb-1"
          >
            <LinearGradient
              colors={["#A991D2", "#F7C0E9"]}
              className="rounded-lg p-6 mb-4 h-36 justify-center relative"
            >
              <Image
                source={require("../../../assets/images/childrenPlay.png")}
                className="absolute bottom-0 -right-4 w-1/2 h-full"
              />
              <TouchableOpacity className="absolute top-8 left-8">
                <Image
                  source={require("../../../assets/images/playIcon.png")}
                  className="w-12 h-11 -top-3 -left-4"
                />
              </TouchableOpacity>
              <View style={{ position: "absolute", bottom: 8, left: 16 }}>
                <Text className="text-inter-bold text-white mb-4 top-3">
                  LEVEL 2
                </Text>
                <Text className="text-inter-regular text-white text-xl">
                  Discrimination
                </Text>
              </View>
            </LinearGradient>
          </Pressable>

          <Pressable
            onPress={() => router.push("/tasks/identification/levels")}
            className="mb-1"
          >
            <LinearGradient
              colors={["#5670EC", "#07BAFE"]}
              className="rounded-lg p-6 mb-4 h-36 justify-center relative"
            >
              <Image
                source={require("../../../assets/images/childrenPlay.png")}
                className="absolute bottom-0 -right-4 w-1/2 h-full"
              />
              <TouchableOpacity className="absolute top-8 left-8">
                <Pressable
                  onPress={() => router.push("/tasks/identification/levels")}
                  className="mb-1"
                >
                  <Image
                    source={require("../../../assets/images/playIcon.png")}
                    className="w-12 h-11 -top-3 -left-4"
                  />
                </Pressable>
              </TouchableOpacity>
              <View style={{ position: "absolute", bottom: 8, left: 16 }}>
                <Text className="text-inter-bold text-white mb-4 top-3">
                  LEVEL 2
                </Text>
                <Text className="text-inter-regular text-white text-xl">
                  Identification
                </Text>
              </View>
            </LinearGradient>
          </Pressable>

          <Pressable onPress={() => router.push("/tasks/comprehension/levels")}>
            <LinearGradient
              colors={["#17A624", "#BBE491"]}
              className="rounded-lg p-6 mb-4 h-36 justify-center relative"
            >
              <Image
                source={require("../../../assets/images/childrenPlay.png")}
                className="absolute bottom-0 -right-4 w-1/2 h-full"
              />
              <TouchableOpacity className="absolute top-8 left-8">
                <Image
                  source={require("../../../assets/images/playIcon.png")}
                  className="w-12 h-11 -top-3 -left-4"
                />
              </TouchableOpacity>
              <View style={{ position: "absolute", bottom: 8, left: 16 }}>
                <Text className="text-inter-bold text-white mb-4 top-3">
                  LEVEL 1
                </Text>
                <Text className="text-inter-regular text-white text-xl">
                  Comprehension
                </Text>
              </View>
            </LinearGradient>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default TaskOnboarding;
