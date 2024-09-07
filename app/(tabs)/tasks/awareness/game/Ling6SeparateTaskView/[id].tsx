import { SafeAreaView, View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Sound {
    sound: string;
    soundUrl: string;
}

interface Data {
    id: number;
    sounds: Sound[];
    voice: string;
    rate: string;
    pitch: string;
    patientID: string | null;
    createdAt: string;
}

export default function Ling6SeparateTaskView() {
    const { id } = useLocalSearchParams<{ id: string }>(); // Type the search params
    const router = useRouter();

    const [playingIndex, setPlayingIndex] = useState<number | null>(null); // Track which sound is playing
    const [responses, setResponses] = useState<Record<number, string>>({}); // Track responses for each sound
    const [amplificationResponse, setAmplificationResponse] = useState<string | null>(null); // Track the response for the additional question
    const [allResponsesCollected, setAllResponsesCollected] = useState<boolean>(false); // Track if all responses are collected

    const data: Data = {
        id: 1,
        sounds: [
            { sound: "ah", soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_ah_20240829222737.wav" },
            { sound: "mm", soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_mm_20240829222737.wav" },
            { sound: "sh", soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_sh_20240829222737.wav" },
            { sound: "ss", soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_ss_20240829222737.wav" },
            { sound: "ee", soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_ee_20240829222737.wav" },
            { sound: "oo", soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_oo_20240829222737.wav" }
        ],
        voice: "en-US-AriaNeural",
        rate: "-25%",
        pitch: "0%",
        patientID: null,
        createdAt: "2024-08-29T16:58:03.433Z",
    };

    useEffect(() => {
        setAllResponsesCollected(
            Object.keys(responses).length === data.sounds.length && amplificationResponse !== null
        );
    }, [responses, amplificationResponse]);

    const handlePress = (index: number) => {
        if (playingIndex === index) {
            setPlayingIndex(null);
            console.log(`Paused sound: ${data.sounds[index].sound}`);
        } else {
            setPlayingIndex(index);
            console.log(`Playing sound: ${data.sounds[index].sound}`);
        }
    };

    const handleResponse = (index: number, response: string) => {
        setResponses((prevResponses) => ({
            ...prevResponses,
            [index]: response,
        }));
        console.log(`Response for sound ${data.sounds[index].sound}: ${response}`);
    };

    const handleAmplificationResponse = (response: string) => {
        setAmplificationResponse(response);
        console.log(`Amplification device response: ${response}`);
    };

    const handleSubmit = () => {
        const collectedResponses = {
            ...responses,
            amplification_device: amplificationResponse,
        };
        console.log("Collected responses:", collectedResponses);
        Alert.alert("Responses Submitted", JSON.stringify(collectedResponses, null, 2));
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <LinearGradient
                colors={['#f2f2f2', '#e6e6e6']}
                style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}
            >
                <TouchableOpacity
                    onPress={() => router.back()} // Navigates back to the previous screen
                    style={{ marginRight: 16 }}
                >
                    <MaterialIcons name="arrow-back" size={24} color="#6C26A6" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-white flex-1 text-center" style={{ color: '#6C26A6' }}>
                    Awareness - Level 3 Task
                </Text>
            </LinearGradient>

            <View className="p-4">
                <Text className="text-lg font-semibold mb-4">Ling 6 Sound Test</Text>

                {/* Additional Question */}
                <LinearGradient
                    colors={['#9b7dc8', '#e8ace1']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        padding: 16,
                        borderRadius: 12,
                        borderWidth: 2,
                        borderColor: '#FFFFFF',
                        marginBottom: 16,
                    }}
                >
                    <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#432559', marginBottom: 12 }}>
                            Does your child wear the amplification device during his/her waking hours?
                        </Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity
                                onPress={() => handleAmplificationResponse('Yes')}
                                style={{
                                    backgroundColor: amplificationResponse === 'Yes' ? "#4CAF50" : "#e0e0e0",
                                    borderRadius: 8,
                                    paddingVertical: 8,
                                    paddingHorizontal: 16,
                                    marginRight: 8,
                                }}
                            >
                                <Text style={{ color: "#FFF", fontWeight: "bold" }}>Yes</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => handleAmplificationResponse('No')}
                                style={{
                                    backgroundColor: amplificationResponse === 'No' ? "#F44336" : "#e0e0e0",
                                    borderRadius: 8,
                                    paddingVertical: 8,
                                    paddingHorizontal: 16,
                                }}
                            >
                                <Text style={{ color: "#FFF", fontWeight: "bold" }}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>

                {/* Grid Layout for Sounds */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {data.sounds.map((item, index) => (
                        <LinearGradient
                            key={index}
                            colors={['#9b7dc8', '#e8ace1']} // Gradient colors
                            style={{
                                width: '48%',
                                padding: 16,
                                borderRadius: 10,
                                marginBottom: 16,
                            }}
                        >
                            <TouchableOpacity
                                style={{ alignItems: 'center' }}
                                onPress={() => handlePress(index)}
                            >
                                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>
                                    {item.sound.toUpperCase()}
                                </Text>
                                <MaterialIcons
                                    name={playingIndex === index ? "pause-circle-filled" : "play-circle-filled"}
                                    size={40}
                                    color="#FFF"
                                />
                            </TouchableOpacity>

                            {/* Response Buttons */}
                            {playingIndex === index && (
                                <View style={{ flexDirection: 'row', marginTop: 8, justifyContent: 'space-between' }}>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: responses[index] === "Yes" ? "#4CAF50" : "#e0e0e0",
                                            borderRadius: 8,
                                            paddingVertical: 8,
                                            paddingHorizontal: 16,
                                            marginRight: 8,
                                        }}
                                        onPress={() => handleResponse(index, "Yes")}
                                    >
                                        <Text style={{ color: "#FFF", fontWeight: "bold" }}>Yes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: responses[index] === "No" ? "#F44336" : "#e0e0e0",
                                            borderRadius: 8,
                                            paddingVertical: 8,
                                            paddingHorizontal: 16,
                                        }}
                                        onPress={() => handleResponse(index, "No")}
                                    >
                                        <Text style={{ color: "#FFF", fontWeight: "bold" }}>No</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </LinearGradient>
                    ))}
                </View>

                {/* Submit Button */}
                {allResponsesCollected && (
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#6C26A6",
                            borderRadius: 8,
                            paddingVertical: 12,
                            paddingHorizontal: 24,
                            alignItems: 'center',
                            marginTop: 16,
                        }}
                        onPress={handleSubmit}
                    >
                        <Text style={{ color: "#FFF", fontWeight: "bold" }}>Submit</Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
}