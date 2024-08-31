import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Audio } from 'expo-av';

export default function Ling6AllTaskView() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [amplificationResponse, setAmplificationResponse] = useState(null);
    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackPosition, setPlaybackPosition] = useState(0);
    const [playbackDuration, setPlaybackDuration] = useState(0);
    const [responseShown, setResponseShown] = useState(false);
    const [activeSound, setActiveSound] = useState(null);
    const [soundResponse, setSoundResponse] = useState(null); // New state for sound response
    const [showSubmitButton, setShowSubmitButton] = useState(false); // New state for submit button visibility

    const data = {
        id: 1,
        voice: "en-US-AriaNeural",
        rate: "-25%",
        pitch: "0%",
        breakTime: "1s",
        soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6All/ling6_en-US-AriaNeural_combined_20240829225334.wav",
        patientID: "1234",
        createdAt: "2024-08-29T17:23:39.463Z",
    };

    useEffect(() => {
        async function loadSound() {
            const { sound } = await Audio.Sound.createAsync({ uri: data.soundUrl });
            setSound(sound);

            sound.setOnPlaybackStatusUpdate(status => {
                if (status.isLoaded) {
                    setPlaybackPosition(status.positionMillis);
                    setPlaybackDuration(status.durationMillis);

                    if (status.didJustFinish) {
                        setResponseShown(true);
                        setActiveSound(data.soundUrl);
                    }
                }
            });
        }

        loadSound();

        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [data.soundUrl]);

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

    const handleAmplificationResponse = (response) => {
        setAmplificationResponse(response);
    };

    const handleSoundResponse = (response) => {
        setSoundResponse(response);
        setShowSubmitButton(true); // Show the submit button when a response is selected
    };

    const handleSubmit = () => {
        // Handle the submit logic here
        console.log('Amplification Response:', amplificationResponse);
        console.log('Sound Response:', soundResponse);
        // Perform submission actions, such as API calls or form submission
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#f2f2f2', '#e6e6e6']}
                style={styles.header}
            >
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backButton}
                >
                    <MaterialIcons name="arrow-back" size={24} color="#6C26A6" />
                </TouchableOpacity>
                <Text style={styles.title}>Awareness - Level 2 Task</Text>
            </LinearGradient>

            <View style={styles.content}>
                <Text style={styles.subtitle}>Ling 6 Sound Test</Text>

                {/* Amplification Device Question */}
                <LinearGradient
                    colors={['#9b7dc8', '#e8ace1']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.questionContainer}
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

                {/* Play/Pause Button and Timer */}
                <View style={styles.playbackControls}>
                    <Text style={styles.subtitle2}>Notice if the child responds at any point</Text>
                    <TouchableOpacity
                        onPress={handlePlayPauseSound}
                        style={styles.playPauseButton}
                    >
                        <MaterialIcons
                            name={isPlaying ? "pause" : "play-arrow"}
                            size={36}
                            color="white"
                        />
                    </TouchableOpacity>
                    <Text style={styles.timerText}>
                        {Math.floor(playbackPosition / 1000)} / {Math.floor(playbackDuration / 1000)} sec
                    </Text>
                </View>

                {/* Response Prompt */}
                {responseShown && activeSound && (
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

                {/* Submit Button */}
                {showSubmitButton && (
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={styles.submitButton}
                    >
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6C26A6',
        flex: 1,
        textAlign: 'center',
    },
    content: {
        padding: 16,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subtitle2: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#e07474',
    },
    questionContainer: {
        padding: 16,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        marginBottom: 16,
    },
    questionContent: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    questionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#432559',
        marginBottom: 12,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    responseButton: {
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginRight: 8,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', // Center the text vertically
    },
    responseButtonText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 16,
    },
    defaultButton: {
        backgroundColor: "#B0BEC5", // Default color for unselected buttons
    },
    selectedYesButton: {
        backgroundColor: "#4CAF50",
    },
    selectedNoButton: {
        backgroundColor: "#F44336",
    },
    playbackControls: {
        alignItems: 'center',
        marginTop: 16,
    },
    playPauseButton: {
        backgroundColor: '#6C26A6',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginBottom: 8,
    },
    timerText: {
        textAlign: 'center',
    },
    responsePromptContainer: {
        marginTop: 24,
    },
    responsePromptText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#432559',
        marginBottom: 12,
    },
    responseButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    submitButton: {
        backgroundColor: '#6C26A6',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});