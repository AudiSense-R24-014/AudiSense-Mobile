import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Audio } from 'expo-av';

import AwarenessSoundTaskService from '@/services/AwarenessService/AwarenessSoundTask.service';

interface Sound {
    name: string;
    url: string;
}

// Define the type for each item in the data array
interface DataItem {
    _id: string;
    sounds: Sound[];
    createdAt: string;
}

interface Response {
    name: string;
    url: string;
    responded: boolean;
    result: boolean | null;
}

export default function AwarenessTaskView() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [playbackPosition, setPlaybackPosition] = useState<number>(0);
    const [playbackDuration, setPlaybackDuration] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [responses, setResponses] = useState<Response[]>([]); // Array to store responses
    const [responseShown, setResponseShown] = useState<boolean>(false); // Flag to control showing responses
    const [activeSound, setActiveSound] = useState<string | null>(null); // Track the currently clicked sound
    const [amplificationResponse, setAmplificationResponse] = useState<boolean | null>(null); // Track the response for the additional question

    const soundRef = useRef<Audio.Sound | null>(null);

    const [data, setData] = useState<DataItem | null>(null);

    useEffect(() => {
        AwarenessSoundTaskService.getAwarenessSoundTaskByID(id)
            .then((response) => {
                setData(response);
            });
    }, []);

    useEffect(() => {
        if (sound) {
            const updatePlaybackStatus = async () => {
                const status = await sound.getStatusAsync();
                if (status.isLoaded) {
                    setPlaybackPosition(status.positionMillis ?? 0);
                    setPlaybackDuration(status.durationMillis ?? 0);
                }
            };

            const interval = setInterval(updatePlaybackStatus, 1000);
            return () => clearInterval(interval);
        }
    }, [sound]);

    async function playSound(url: string, soundName: string) {
        if (sound) {
            await sound.unloadAsync();
            setSound(null);
        }

        setIsLoading(true);
        const { sound: newSound, status } = await Audio.Sound.createAsync({ uri: url });
        setSound(newSound);
        setIsPlaying(true);
        setIsLoading(false);
        soundRef.current = newSound;

        newSound.setOnPlaybackStatusUpdate(status => {
            if (status.isLoaded) {
                setPlaybackPosition(status.positionMillis ?? 0);
                setPlaybackDuration(status.durationMillis ?? 0);
                setIsPlaying(status.isPlaying);
            }
        });
        await newSound.setVolumeAsync(1.0);

        await newSound.playAsync();
        setActiveSound(soundName); // Set the clicked sound as the active sound
        setResponseShown(true); // Show the response section once
        setResponses(prevResponses => [
            ...prevResponses.filter(response => response.name !== soundName), // Remove old entries with the same name
            { name: soundName, url: url, responded: false, result: null }
        ]);
    }

    async function togglePlayPause() {
        if (sound) {
            if (isPlaying) {
                await sound.pauseAsync();
            } else {
                await sound.setVolumeAsync(1.0);
                await sound.playAsync();
            }
            setIsPlaying(!isPlaying);
        }
    }

    function handleButtonPress(soundName: string, result: boolean) {
        setResponses(prevResponses => prevResponses.map(response =>
            response.name === soundName
                ? { ...response, responded: true, result: result } // Mark as responded and set result
                : response
        ));
    }

    function allResponsesDone() {
        // Check if all responses are done
        return responses.length === data?.sounds.length && responses.every(response => response.responded);
    }

    function handleSubmit() {

        const finalizedResponses = responses.map(response => {
            return {
                name: response.name,
                response: response.result,
            };
        });

        // Handle the submit action here
        const collectedResponses = {
            responses: finalizedResponses,
            isImplantOn: amplificationResponse,
        };
        // Handle submission logic here
        // console.log("Collected responses:", collectedResponses);

        AwarenessSoundTaskService.collectResponse(id, collectedResponses)
            .then(() => {
                Alert.alert("Responses submitted successfully!");
                router.push(`/tasks/awareness/levels`);
            })
            .catch((error) => {
                Alert.alert("Failed to submit responses. Please try again later.");
                console.error("Failed to submit responses", error);
            });

    }

    const handleAmplificationResponse = (response: boolean) => {
        setAmplificationResponse(response);
        console.log(`Amplification device response: ${response}`);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <LinearGradient
                colors={['#f2f2f2', '#e6e6e6']}
                style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}
            >
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={{ marginRight: 16 }}
                >
                    <MaterialIcons name="arrow-back" size={24} color="#6C26A6" />
                </TouchableOpacity>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#6C26A6', flex: 1, textAlign: 'center' }}>
                    Awareness - Level 1 Task
                </Text>
            </LinearGradient>
            <View style={{ padding: 16 }}>

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
                        marginBottom: 16, // Add some margin at the bottom
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

                <View style={{ marginTop: 24 }}>
                    {data?.sounds.map((soundItem) => (
                        <View key={soundItem.name}>
                            <TouchableOpacity
                                onPress={() => playSound(soundItem.url, soundItem.name)}
                                style={{
                                    marginBottom: 16,
                                    padding: 12,
                                    backgroundColor: '#6C26A6',
                                    borderRadius: 10,
                                }}
                            >
                                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 16 }}>
                                    Play {soundItem.name.replace('_', ' ')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                    <View style={{ alignItems: 'center', marginTop: 16 }}>
                        <TouchableOpacity
                            onPress={togglePlayPause}
                            style={styles.playPauseButton}
                        >
                            <MaterialIcons
                                name={isPlaying ? "pause" : "play-arrow"}
                                size={36}
                                color="#6C26A6"
                            />
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center', marginTop: 8 }}>
                            {Math.floor(playbackPosition / 1000)} / {Math.floor(playbackDuration / 1000)} sec
                        </Text>
                    </View>

                    {responseShown && (
                        <View style={styles.responseContainer}>
                            <Text style={styles.responseTitle}>
                                Did your child respond to this sound?
                            </Text>
                            <View style={styles.responseButtons}>
                                <TouchableOpacity
                                    style={[styles.responseButton, { backgroundColor: "#4CAF50" }]}
                                    onPress={() => handleButtonPress(activeSound!, true)}
                                >
                                    <Text style={styles.responseButtonText}>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.responseButton, { backgroundColor: "#F44336" }]}
                                    onPress={() => handleButtonPress(activeSound!, false)}
                                >
                                    <Text style={styles.responseButtonText}>No</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {allResponsesDone() && (
                        <TouchableOpacity
                            onPress={handleSubmit}
                            style={{
                                marginTop: 16,
                                paddingVertical: 12,
                                paddingHorizontal: 24,
                                backgroundColor: '#FF6347',
                                borderRadius: 8,
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Submit Responses</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    playPauseButton: {
        backgroundColor: '#FFF',
        borderRadius: 50,
        padding: 16,
        elevation: 5,
    },
    responseContainer: {
        marginTop: 24,
    },
    responseTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#432559',
        marginBottom: 12,
        textAlign: 'center',
    },
    responseButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    responseButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    responseButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});