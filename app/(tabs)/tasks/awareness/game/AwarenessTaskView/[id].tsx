import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
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

interface DataItem {
    _id: string;
    sounds: Sound[];
    createdAt: string;
}

export default function AwarenessTaskView() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const [sounds, setSounds] = useState<Audio.Sound[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [playbackComplete, setPlaybackComplete] = useState<boolean>(false);
    const [amplificationResponse, setAmplificationResponse] = useState<boolean | null>(null);

    useEffect(() => {
        async function loadSounds() {
            setIsLoading(true);
            const response = await AwarenessSoundTaskService.getAwarenessSoundTaskByID(id);

            const loadedSounds: Audio.Sound[] = [];
            // Preload all sounds
            for (const soundItem of response.sounds.slice(0, 3)) {
                const { sound } = await Audio.Sound.createAsync({ uri: soundItem.url });
                loadedSounds.push(sound);
            }
            setSounds(loadedSounds);
            setIsLoading(false);
        }

        loadSounds();

        return () => {
            // Unload sounds when component unmounts
            sounds.forEach(sound => {
                if (sound) {
                    sound.unloadAsync();
                }
            });
        };
    }, []);

    const playSoundsInSequence = async () => {
        setIsPlaying(true);

        for (let i = 0; i < sounds.length; i++) {
            if (sounds[i]) {
                // 5 seconds break before each sound
                await new Promise(resolve => setTimeout(resolve, 5000));
                await sounds[i].playAsync();
                await new Promise((resolve) => {
                    sounds[i].setOnPlaybackStatusUpdate((status) => {
                        if (status.didJustFinish) {
                            resolve(true); // Resolve when the sound finishes
                        }
                    });
                });
            }
        }

        // Final 5-second break after all sounds
        await new Promise(resolve => setTimeout(resolve, 5000));
        setIsPlaying(false);
        setPlaybackComplete(true);
    };

    const handleAmplificationResponse = (response: boolean) => {
        setAmplificationResponse(response);
        console.log(`Amplification device response: ${response}`);
    };

    const handleSubmit = () => {
        const collectedResponses = {
            isImplantOn: amplificationResponse,
        };

        AwarenessSoundTaskService.collectResponse(id, collectedResponses)
            .then(() => {
                Alert.alert("Responses submitted successfully!");
                router.push(`/tasks/awareness/levels`);
            })
            .catch((error) => {
                Alert.alert("Failed to submit responses. Please try again later.");
                console.error("Failed to submit responses", error);
            });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <LinearGradient
                colors={['#f2f2f2', '#e6e6e6']}
                style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}
            >
                <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
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

                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#6C26A6" />
                        <Text style={{ marginTop: 16, fontSize: 16 }}>Loading sounds...</Text>
                    </View>
                ) : (
                    <View style={{ alignItems: 'center', marginTop: 16 }}>
                        <TouchableOpacity
                            onPress={playSoundsInSequence}
                            disabled={isPlaying}
                            style={styles.playButton}
                        >
                            <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 16 }}>
                                {isPlaying ? "Playing..." : "Play Sounds"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                {playbackComplete && (
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playButton: {
        backgroundColor: '#6C26A6',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 24,
        elevation: 5,
    },
});