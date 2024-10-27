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
import { Ionicons } from "@expo/vector-icons"; // For back button icon
import DiscriminationTaskService from "@/services/DiscriminationTask.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define types
interface Activity {
    _id: string;
    status: string;
    providedAnswers: any[];
    patient: string;
    organization: string;
    discriminationTask: string;
    createdOn: string;
    updatedOn: string;
    __v: number;
    level: string;
    score:Number;
}

const Levels: React.FC = () => {
    const [userId, setUserId] = useState<string>("");
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
            DiscriminationTaskService.getDiscriminationActivityByPatientId(
                userId
            )
                .then((data: Activity[]) => {
                    setAllActivities(data);
                })
                .catch((error) => {
                    console.error(
                        "Error fetching discrimination activities:",
                        error
                    );
                });
        }
    }, [userId]);

    const renderActivityCard = (
        level: string,
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
                        Number(level) === 1
                            ? "./levelOne"
                            : "./levelTwo",
                    params: { discActId : _id },
                })
            }
            className={`py-4 px-5 w-5/6 rounded-lg shadow-md border ${
                level === "1" ? "border-emerald-600" : "border-rose-600"
            } ${clickable ? "bg-slate-900" : "bg-slate-700 opacity-90"}`}
        >
            <Text
                className={`text-xl font-semibold ${
                    level === "1" ? "text-emerald-400" : "text-rose-400"
                }`}
            >
                Discrimination Activity 🎮
            </Text>
            <Text className="text-gray-500 text-base">{`Level - ${
                level === "1" ? "Listening" : "Speech"
            }`}</Text>
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
                            Discrimination Tasks
                        </Text>
                        <View className="px-2" />
                    </View>
                    <ScrollView>
                        <View className="flex-1 items-center space-y-6">
                            {allActivities
                                .filter(
                                    (activity) => activity.status === "Assigned"
                                )
                                .map((activity) =>
                                    renderActivityCard(
                                        activity.level,
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
                                        "Completed",
                                        activity._id,
                                        `${activity.score} / 2`, // Adjust based on data
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
