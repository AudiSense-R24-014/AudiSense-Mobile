import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    Pressable,
    ImageBackground,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ComprehensionTaskService from "@/services/ComprehensionTask.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Activity {
    _id: string;
    level: number;
    status: string;
    correctResponsesCount: number;
    totalQuestionCount: number;
    task: any;
}

const Levels = () => {
    const [userId, setUserId] = useState(null);
    const [allActivities, setAllActivities] = useState<Activity[]>([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem("audi-patient");
                if (storedUser) {
                    setUserId(JSON.parse(storedUser)._id);
                }
            } catch (error) {
                console.error(
                    "Error retrieving patient from AsyncStorage:",
                    error
                );
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        if (userId) {
            ComprehensionTaskService.getActivitiesByPatientId(userId)
                .then((data) => {
                    setAllActivities(data);
                })
                .catch((error) => {
                    console.error(
                        "Error fetching comprehension activities:",
                        error
                    );
                });
        }
    }, [userId]);

    const renderActivityCard = (
        level: number,
        taskDesc: string,
        status: string,
        _id: string,
        score?: string,
        clickable?: boolean
    ) => (
        <Pressable
            key={_id}
            onPress={() =>
              clickable &&
              router.push({
                  pathname:
                      level === 1
                          ? "/tasks/comprehension/game/listen"
                          : "/tasks/comprehension/game/speak",
                  params: { activityId: _id },
              })
          }
            className={`py-4 px-5 w-5/6 rounded-lg shadow-md border ${
                level === 1 ? "border-emerald-600" : "border-rose-600"
            } ${clickable ? "bg-slate-900" : "bg-slate-700 opacity-90"}`}
        >
            <Text
                className={`text-xl font-semibold ${
                    level === 1 ? "text-emerald-400" : "text-rose-400"
                }`}
            >
                {taskDesc} Activity 🎮
            </Text>
            <Text className="text-gray-500 text-base">{`Level ${level}`}</Text>
            <Text className="text-gray-300 text-base font-semibold">
                {status}
            </Text>
            {score && (
                <Text className="text-gray-400 text-sm font-semibold">
                    Score: {score}
                </Text>
            )}
        </Pressable>
    );

    return (
        <View className="flex-1 bg-white">
            <ImageBackground
                source={require("../../../../assets/images/background.png")}
                className="flex-1"
                resizeMode="cover"
            >
                <SafeAreaView className="flex-1">
                    <View className="flex-row items-center justify-between py-8 px-2 shadow-lg">
                        <Pressable
                            onPress={() => router.back()}
                            className="pt-2"
                        >
                            <Ionicons
                                name="arrow-back"
                                size={25}
                                color="orange"
                            />
                        </Pressable>
                        <Text className="text-amber-500 text-3xl font-sevillana">
                            Comprehension Tasks
                        </Text>
                        <View className="px-2" />
                    </View>
                    <ScrollView>
                        {/* Main Content */}
                        <View className="flex-1 items-center space-y-6">
                            {allActivities
                                .filter(
                                    (activity) => activity.status === "Assigned"
                                )
                                .map((activity) =>
                                    renderActivityCard(
                                        activity.level,
                                        activity.level === 2
                                            ? "Speech"
                                            : "Listening",
                                        "Assigned",
                                        activity._id,
                                        undefined,
                                        true
                                    )
                                )}

                            {allActivities
                                .filter(
                                    (activity) =>
                                        activity.status === "Need Assessment"
                                )
                                .slice()
                                .reverse()
                                .map((activity) =>
                                    renderActivityCard(
                                        activity.level,
                                        activity.level === 2
                                            ? "Speech"
                                            : "Listening",
                                        "Needs Assessment",
                                        activity._id,
                                        undefined,
                                        false
                                    )
                                )}

                            {allActivities
                                .filter(
                                    (activity) =>
                                        activity.status === "Completed"
                                )
                                .slice()
                                .reverse()
                                .map((activity) =>
                                    renderActivityCard(
                                        activity.level,
                                        activity.level === 2
                                            ? "Speech"
                                            : "Listening",
                                        "Completed",
                                        activity._id,
                                        `${activity.correctResponsesCount} / ${activity.totalQuestionCount}`,
                                        false
                                    )
                                )}
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
};

export default Levels;
