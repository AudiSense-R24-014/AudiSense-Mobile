import { Text, TouchableOpacity, View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React , { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Patient {
    dob: any;
    hearingAge: any;
    firstName: string;
    lastName: string;
    email: string;
}

const Dashboard = () => {
    const [patient, setPatient] = useState<Patient | null>(null); // Changed initial state to null

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem("audi-patient");
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    setPatient(parsedUser); // Set the parsed user data to state
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

    if (!patient) {
        return <Text>Loading...</Text>; // Show a loading state if the patient data isn't available yet
    }

    // Calculate age and hearing age from dob and hearingAge properties
    const calculateAge = (dob :any) => {
        const birthDate = new Date(dob);
        const currentDate = new Date();
        const diffMs = currentDate.getTime() - birthDate.getTime();
        const ageDate = new Date(diffMs);

        const years = Math.abs(ageDate.getUTCFullYear() - 1970);
        const months =
            currentDate.getMonth() - birthDate.getMonth() + 12 * years;

        if (years < 2) {
            return `${months} months`;
        } else {
            return `${years} years`;
        }
    };

    const calculateHearingAge = (hearingAge : any) => {
        if (hearingAge < 24) {
            // Less than 2 years
            return `${hearingAge} months`;
        } else {
            const years = Math.floor(hearingAge / 12);
            return `${years} years`;
        }
    };

    const age = calculateAge(patient?.dob);
    const hearingAge = calculateHearingAge(patient?.hearingAge);

    return (
        <ScrollView>
            <SafeAreaView className="flex-1 bg-white">
                <LinearGradient
                    colors={["#A991D2", "#F7C0E9"]}
                    className="rounded-lg p-6 mb-4 h-36 justify-center relative mx-4 my-2"
                >
                    <View className="flex-row items-center">
                        <Image
                            source={require("../../assets/images/profilePictureSample.png")}
                            className="w-20 h-20 rounded-full"
                        />
                        <View className="ml-4">
                            <Text className="text-lg text-white font-bold">{`${patient.firstName} ${patient.lastName}`}</Text>
                            <Text className="text-sm text-white">
                                {patient.email}
                            </Text>
                            <Text className="text-sm text-white">
                                Age: {age}
                            </Text>
                            <Text className="text-sm text-white">
                                Hearing Age: {hearingAge}
                            </Text>
                        </View>
                    </View>
                </LinearGradient>

                <LinearGradient
                    colors={["#927AFF", "#ADA1E2"]}
                    className="flex-row rounded-lg mb-4 h-auto mx-4 my-2 items-center"
                >
                    <View className="-mb-3">
                        <Image
                            source={require("../../assets/images/starImage.png")}
                            className="w-22 h-22"
                        />
                    </View>
                    <Text className="text-lg text-white font-bold">
                        Your Current Score: 120
                    </Text>
                </LinearGradient>

                <LinearGradient
                    colors={["#A991D2", "#F7C0E9"]}
                    className="mx-4 my-2 rounded-lg"
                >
                    <View className=" p-4 mb-4 mx-4 my-2">
                        <Text className="text-lg font-bold mb-4 text-white">
                            Recent Tasks
                        </Text>
                        <View className="flex-row justify-between mb-4 border-b-2 p-2 border-white">
                            <Text className="text-base text-white">
                                Awareness
                            </Text>
                            <View className="flex-row items-center">
                                <Text className="text-sm mr-4 text-white">
                                    Level 02
                                </Text>
                                <Text className="text-sm text-white">
                                    COMPLETED
                                </Text>
                            </View>
                        </View>
                        <View className="flex-row justify-between mb-4 border-b-2 p-2 border-white">
                            <Text className="text-base text-white">
                                Discrimination
                            </Text>
                            <View className="flex-row items-center">
                                <Text className="text-sm mr-4 text-white">
                                    Level 01
                                </Text>
                                <Text className="text-sm text-white">
                                    COMPLETED
                                </Text>
                            </View>
                        </View>
                        <View className="flex-row justify-between mb-4 border-b-2 p-2 border-white">
                            <Text className="text-base text-white">
                                Identification
                            </Text>
                            <View className="flex-row items-center">
                                <Text className="text-sm mr-4 text-white">
                                    Level 01
                                </Text>
                                <Text className="text-sm text-white">
                                    COMPLETED
                                </Text>
                            </View>
                        </View>
                        <View className="p-2 rounded  text-base text-center mx-12 ">
                            <TouchableOpacity
                                className="bg-white p-2 rounded-lg w-48"
                                onPress={() =>
                                    router.push(
                                        "../tasks/discrimination/levelOne"
                                    )
                                }
                            >
                                <Text className="text-violet-800 font-bold text-center">
                                    More
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>

                <View className="bg-white p-4 mb-4">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-lg font-bold mb-4">PROGRESS</Text>
                        <Text className="text-sm mb-4">07 Months Jan-July</Text>
                    </View>
                    <View className="h-40">
                        {/* Add your chart library here */}
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

export default Dashboard;
