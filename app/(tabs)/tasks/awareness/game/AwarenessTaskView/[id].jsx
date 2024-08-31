import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Audio } from 'expo-av';

export default function AwarenessTaskView() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackPosition, setPlaybackPosition] = useState(0);
    const [playbackDuration, setPlaybackDuration] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [responses, setResponses] = useState([]); // Array to store responses
    const [responseShown, setResponseShown] = useState(false); // Flag to control showing responses
    const [activeSound, setActiveSound] = useState(null); // State to track the currently clicked sound
    const [amplificationResponse, setAmplificationResponse] = useState(null); // Track the response for the additional question

    const soundRef = useRef(null);

    const data = {
        id: 1,
        sounds: [
            {
                name: "church_bells",
                url: "https://storage.googleapis.com/cdap-awareness.appspot.com/awarenessAudio/church_bells_20240828224154.wav",
            },
            {
                name: "clock_tick",
                url: "https://storage.googleapis.com/cdap-awareness.appspot.com/awarenessAudio/clock_tick_20240828224034.wav",
            },
            {
                name: "car_horn",
                url: "https://storage.googleapis.com/cdap-awareness.appspot.com/awarenessAudio/car_horn_20240828224036.wav",
            }
        ],
        createdAt: "2024-08-28T17:10:38.981Z",
    };

    useEffect(() => {
        if (sound) {
            const updatePlaybackStatus = async () => {
                const status = await sound.getStatusAsync();
                if (status.isLoaded) {
                    setPlaybackPosition(status.positionMillis);
                    setPlaybackDuration(status.durationMillis);
                }
            };

            const interval = setInterval(updatePlaybackStatus, 1000);
            return () => clearInterval(interval);
        }
    }, [sound]);

    async function playSound(url, soundName) {
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
                setPlaybackPosition(status.positionMillis);
                setPlaybackDuration(status.durationMillis);
                setIsPlaying(status.isPlaying);
            }
        });

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
                await sound.playAsync();
            }
            setIsPlaying(!isPlaying);
        }
    }

    function handleButtonPress(soundName, result) {
        setResponses(prevResponses => prevResponses.map(response =>
            response.name === soundName
                ? { ...response, responded: true, result: result } // Mark as responded and set result
                : response
        ));
    }

    function allResponsesDone() {
        // Check if all responses are done
        return responses.length === data.sounds.length && responses.every(response => response.responded);
    }

    function handleSubmit() {
        // Handle the submit action here
        const collectedResponses = {
            ...responses,
            amplification_device: amplificationResponse,
        };
        console.log("Collected responses:", collectedResponses);
        Alert.alert("Responses Submitted", JSON.stringify(collectedResponses, null, 2));
    }

    const handleAmplificationResponse = (response) => {
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

                <View style={{ marginTop: 24 }}>
                    {data.sounds.map((soundItem, index) => (
                        <View key={index}>
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

                    {responseShown && activeSound && (
                        <View style={{ marginTop: 24 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#432559', marginBottom: 12 }}>
                                Did the child respond to the sound "{activeSound.replace('_', ' ')}"?
                            </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
                                <TouchableOpacity
                                    onPress={() => handleButtonPress(activeSound, true)}
                                    style={[
                                        styles.button,
                                        responses.find(r => r.name === activeSound)?.result === true && styles.selectedYesButton
                                    ]}
                                >
                                    <Text style={styles.buttonText}>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => handleButtonPress(activeSound, false)}
                                    style={[
                                        styles.button,
                                        responses.find(r => r.name === activeSound)?.result === false && styles.selectedNoButton
                                    ]}
                                >
                                    <Text style={styles.buttonText}>No</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
            </View>

            {/* Submit Button */}
            {allResponsesDone() && (
                <View style={styles.submitButtonContainer}>
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={styles.submitButton}
                    >
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#6C26A6',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginHorizontal: 8,
    },
    selectedYesButton: {
        backgroundColor: '#4CAF50', // Green for Yes
    },
    selectedNoButton: {
        backgroundColor: '#F44336', // Red for No
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    playPauseButton: {
        padding: 12,
        borderRadius: 30,
        backgroundColor: '#E6E6E6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitButtonContainer: {
        padding: 8,
        backgroundColor: '#f2f2f2',
        borderTopWidth: 1,
        borderTopColor: '#e6e6e6',
        alignItems: 'center',
    },
    submitButton: {
        backgroundColor: '#6C26A6',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 20,
    },
    submitButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});