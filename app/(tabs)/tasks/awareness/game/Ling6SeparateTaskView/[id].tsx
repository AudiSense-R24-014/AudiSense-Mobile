import { ScrollView, SafeAreaView, View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Audio } from 'expo-av';  // Import from expo-av

import Ling6SeparateService from '@/services/AwarenessService/Ling6Separate.service';

interface Sound {
    sound: string;
    soundUrl: string;
}

interface Data {
    _id: string;
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
    const [amplificationResponse, setAmplificationResponse] = useState<boolean | null>(null); // Track the response for the additional question
    const [allResponsesCollected, setAllResponsesCollected] = useState<boolean>(false); // Track if all responses are collected
    const [data, setData] = useState<Data | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // Track loading state
    const [error, setError] = useState<string | null>(null); // Track error state
    const soundRef = useRef<Audio.Sound | null>(null); // Ref for audio sound object

    useEffect(() => {
        Ling6SeparateService.getLing6SeparateTaskByID(id)
            .then((response) => {
                setData(response);
            })
            .catch((err) => {
                setError('Failed to fetch data');
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        if (data) {
            const allResponsesCollected =
                data.sounds && // Ensure data.sounds exists
                Object.keys(responses).length === data.sounds.length &&
                amplificationResponse !== null;
            setAllResponsesCollected(allResponsesCollected);
        }
    }, [responses, amplificationResponse, data]);

    const playSound = async (soundUrl: string) => {
        try {
            if (soundRef.current) {
                await soundRef.current.unloadAsync(); // Unload any currently playing sound
            }

            const { sound } = await Audio.Sound.createAsync({ uri: soundUrl });
            soundRef.current = sound; // Store sound in ref
            await sound.setVolumeAsync(1.0);
            await sound.playAsync(); // Play sound
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    };

    const handlePress = (index: number) => {
        if (playingIndex === index) {
            setPlayingIndex(null);
            soundRef.current?.pauseAsync(); // Pause the currently playing sound
            console.log(`Paused sound: ${data.sounds[index].sound}`);
        } else {
            setPlayingIndex(index);
            playSound(data.sounds[index].soundUrl); // Play the new sound
            console.log(`Playing sound: ${data.sounds[index].sound}`);
        }
    };

    const handleResponse = (index: number, response: string) => {
        setResponses((prevResponses) => ({
            ...prevResponses,
            [index]: response,  // Ensure you are updating response for the correct sound
        }));
        console.log(`Response for sound ${data.sounds[index].sound}: ${response}`);
    };

    const handleAmplificationResponse = (response: boolean) => {
        setAmplificationResponse(response);
        console.log(`Amplification device response: ${response}`);
    };

    const handleSubmit = () => {
        const recordedResponses = [
            { name: 'ah', response: responses[0] === 'Yes' ? true : false, },
            { name: 'mm', response: responses[1] === 'Yes' ? true : false, },
            { name: 'sh', response: responses[2] === 'Yes' ? true : false, },
            { name: 'ss', response: responses[3] === 'Yes' ? true : false, },
            { name: 'ee', response: responses[4] === 'Yes' ? true : false, },
            { name: 'oo', response: responses[5] === 'Yes' ? true : false, }
        ]
        const collectedResponses = {
            responses: recordedResponses,
            isImplantOn: amplificationResponse,
        };
        // console.log("Collected responses:", collectedResponses);
        // Alert.alert("Responses Submitted", JSON.stringify(collectedResponses, null, 2));
        Ling6SeparateService.collectResponse(id, collectedResponses)
            .then(() => {
                Alert.alert("Responses submitted successfully!");
                router.push(`/tasks/awareness/levels`);
            })
            .catch((error) => {
                Alert.alert("Failed to submit responses. Please try again later.");
                console.error("Failed to submit responses", error);
            });
    };

    useEffect(() => {
        return () => {
            soundRef.current?.unloadAsync(); // Unload sound when the component is unmounted
        };
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#6C26A6" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'red' }}>{error}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
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
                <Text style={{ color: '#6C26A6', fontSize: 24, fontWeight: 'bold', textAlign: 'center', flex: 1 }}>
                    Awareness - Level 3 Task
                </Text>
            </LinearGradient>

            <ScrollView style={{ padding: 16 }}>
                <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16 }}>Ling 6 Sound Test</Text>

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
                                onPress={() => handleAmplificationResponse(true)}
                                style={{
                                    backgroundColor: amplificationResponse === true ? "#4CAF50" : "#e0e0e0",
                                    borderRadius: 8,
                                    paddingVertical: 8,
                                    paddingHorizontal: 16,
                                    marginRight: 8,
                                }}
                            >
                                <Text style={{ color: "#FFF", fontWeight: "bold" }}>Yes</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => handleAmplificationResponse(false)}
                                style={{
                                    backgroundColor: amplificationResponse === false ? "#F44336" : "#e0e0e0",
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
                    {data?.sounds && data.sounds.length > 0 && data.sounds.map((item, index) => (
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

                            {/* Response Options */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
                                <TouchableOpacity
                                    onPress={() => handleResponse(index, 'Yes')}
                                    style={{
                                        backgroundColor: responses[index] === 'Yes' ? '#4CAF50' : '#e0e0e0',
                                        paddingVertical: 8,
                                        paddingHorizontal: 16,
                                        borderRadius: 8,
                                    }}
                                >
                                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Yes</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => handleResponse(index, 'No')}
                                    style={{
                                        backgroundColor: responses[index] === 'No' ? '#F44336' : '#e0e0e0',
                                        paddingVertical: 8,
                                        paddingHorizontal: 16,
                                        borderRadius: 8,
                                    }}
                                >
                                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>No</Text>
                                </TouchableOpacity>
                            </View>
                        </LinearGradient>
                    ))}
                </View>

                {allResponsesCollected && (
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#6C26A6',
                            paddingVertical: 12,
                            borderRadius: 8,
                            marginTop: 16,
                            alignItems: 'center',
                        }}
                        onPress={handleSubmit}
                    >
                        <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>Submit Responses</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}