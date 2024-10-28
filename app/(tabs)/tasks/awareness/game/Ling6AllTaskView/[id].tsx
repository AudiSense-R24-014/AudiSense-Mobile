import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Audio, AVPlaybackStatus } from 'expo-av';

import Ling6AllTaskService from '@/services/AwarenessService/Ling6AllTask.service';

interface Data {
    _id: string;
    voice: string;
    rate: string;
    pitch: string;
    breakTime: string;
    soundUrl: string;
    patientID: string;
    createdAt: string;
}

export default function Ling6AllTaskView() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const [amplificationResponse, setAmplificationResponse] = useState<boolean | null>(null);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackPosition, setPlaybackPosition] = useState(0);
    const [playbackDuration, setPlaybackDuration] = useState(0);
    const [responseShown, setResponseShown] = useState(false);
    const [activeSound, setActiveSound] = useState<string | null>(null);
    const [soundResponse, setSoundResponse] = useState<string | null>(null);
    const [showSubmitButton, setShowSubmitButton] = useState(false);
    const [data, setData] = useState<Data | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Ling6AllTaskService.getLing6AllTaskByID(id)
            .then((response) => {
                setData(response);
            });
    }, [id]);

    useEffect(() => {
        if (data?.soundUrl) {
            const loadSound = async () => {
                setIsLoading(true);
                const { sound } = await Audio.Sound.createAsync({ uri: data.soundUrl });
                setIsLoading(false);
                setSound(sound);
                await sound.setVolumeAsync(1.0);

                sound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
                    if (status.isLoaded) {
                        setPlaybackPosition(status.positionMillis ?? 0);
                        setPlaybackDuration(status.durationMillis ?? 0);

                        if (status.didJustFinish) {
                            setResponseShown(true);
                            setActiveSound(data.soundUrl);
                            setShowSubmitButton(true);
                        }
                    }
                });
            };

            loadSound();

            return () => {
                if (sound) {
                    sound.unloadAsync();
                }
            };
        }
    }, [data?.soundUrl]);

    const handlePlayPauseSound = async () => {
        if (sound) {
            if (isPlaying) {
                await sound.pauseAsync();
            } else {
                await sound.playAsync();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSubmit = () => {
        const collectedResponses = {
            isImplantOn: amplificationResponse,
        };

        Ling6AllTaskService.collectResponse(id, collectedResponses)
        .then(() => {
            Alert.alert("Responses submitted successfully!");
            router.push(`/tasks/awareness/levels`);
        })
        .catch((error) => {
            Alert.alert("Failed to submit responses. Please try again later.");
        });
    }
    

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#f2f2f2', '#e6e6e6']} style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color="#6C26A6" />
                </TouchableOpacity>
                <Text style={styles.title}>Awareness - Level 2 Task</Text>
            </LinearGradient>

            <View style={styles.content}>
                <Text style={styles.subtitle}>Ling 6 Sound Test</Text>

                <LinearGradient
                    colors={['#9b7dc8', '#e8ace1']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.questionContainer}
                >
                    <Text style={styles.questionText}>
                        Does your child wear the amplification device during his/her waking hours?
                    </Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => setAmplificationResponse(true)}
                            style={[
                                styles.responseButton,
                                amplificationResponse === true ? styles.selectedYesButton : styles.defaultButton
                            ]}
                        >
                            <Text style={styles.responseButtonText}>Yes</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setAmplificationResponse(false)}
                            style={[
                                styles.responseButton,
                                amplificationResponse === false ? styles.selectedNoButton : styles.defaultButton
                            ]}
                        >
                            <Text style={styles.responseButtonText}>No</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>

                {isLoading ? (
                    <ActivityIndicator size="large" color="#6C26A6" style={{ marginTop: 20 }} />
                ) : (
                    <View style={styles.playbackControls}>
                        <TouchableOpacity onPress={handlePlayPauseSound} style={styles.playPauseButton}>
                            <Text style={styles.responseButtonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
                        </TouchableOpacity>
                    </View>
                )}
                
                {responseShown && (
                    <View style={styles.responsePromptContainer}>
                        <Text style={styles.responsePromptText}>
                            Did the child respond to the sound?
                        </Text>
                        <View style={styles.responseButtonContainer}>
                            <TouchableOpacity
                                onPress={() => handleSoundResponse('Yes')}
                                style={[
                                    styles.responseButton,
                                    soundResponse === 'Yes' ? styles.selectedYesButton : styles.defaultButton
                                ]}
                            >
                                <Text style={styles.responseButtonText}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleSoundResponse('No')}
                                style={[
                                    styles.responseButton,
                                    soundResponse === 'No' ? styles.selectedNoButton : styles.defaultButton
                                ]}
                            >
                                <Text style={styles.responseButtonText}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {showSubmitButton && (
                    <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    header: { padding: 16, flexDirection: 'row', alignItems: 'center' },
    backButton: { marginRight: 16 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#6C26A6', flex: 1, textAlign: 'center' },
    content: { padding: 16 },
    subtitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
    subtitle2: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: '#e07474' },
    questionContainer: { padding: 16, borderRadius: 12, borderWidth: 2, borderColor: '#FFFFFF', marginBottom: 16 },
    questionText: { fontSize: 16, fontWeight: 'bold', color: '#432559', marginBottom: 12 },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
    responseButton: { borderRadius: 8, paddingVertical: 12, paddingHorizontal: 24, marginRight: 8, flex: 1, alignItems: 'center' },
    responseButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
    defaultButton: { backgroundColor: '#B0BEC5' },
    selectedYesButton: { backgroundColor: '#4CAF50' },
    selectedNoButton: { backgroundColor: '#F44336' },
    playbackControls: { alignItems: 'center', marginTop: 16 },
    playPauseButton: { backgroundColor: '#6C26A6', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 24, marginBottom: 8 },
    timerText: { textAlign: 'center' },
    responsePromptContainer: { marginTop: 24 },
    responsePromptText: { fontSize: 16, fontWeight: 'bold', color: '#432559', marginBottom: 12 },
    responseButtonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
    submitButton: { backgroundColor: '#6C26A6', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 24, alignItems: 'center' },
    submitButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});