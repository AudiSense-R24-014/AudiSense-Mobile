import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Button } from 'react-native';
import { Audio } from 'expo-av';
import DiscriminationTaskService from '@/services/DiscriminationTask.service';
import QuestionButton from '@/components/molecules/QuestionButton';
import AnswerButton from '@/components/molecules/AnswerButton';
import SpeechInput from '@/components/molecules/SpeechInput';
import { storage, ref, uploadBytes, getDownloadURL } from "@/firebaseConfig";

const DiscriminationLevel2 = () => {
    const [isPlayingFour, setIsPlayingFour] = useState(false);
    const [isPlayingRoar, setIsPlayingRoar] = useState(false);
    const [recordingAudio, setRecordingAudio] = useState<any>();
    const [recordings, setRecordings] = useState<{ sound: any; duration: string; file: any; }[]>([]);

    const [firstWord, setFirstWord] = useState("");
    const [secondWord, setSecondWord] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        DiscriminationTaskService.getDiscriminationTaskById("66db2163230c2790b39a8df3").then((data) => {
            setFirstWord(data?.word1);
            setSecondWord(data?.word2);
        });
    }, []);

    async function startRecording() {
        try {
            const perm = await Audio.requestPermissionsAsync();
            if (perm.status === "granted") {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true
                });
                const { recording } = await Audio.Recording.createAsync();
                setRecordingAudio(recording);
            }
        } catch (err) {
            console.error("Failed to start recording", err);
        }
    }

    async function stopRecording() {
        setRecordingAudio(undefined);
        await recordingAudio.stopAndUnloadAsync();
        let allRecordings = [...recordings];
        const { sound, status } = await recordingAudio.createNewLoadedSoundAsync();
        allRecordings.push({
            sound: sound,
            duration: getDurationFormatted(status.durationMillis),
            file: recordingAudio.getURI()
        });
        setRecordings(allRecordings);
    }

    function getDurationFormatted(milliseconds: any) {
        const minutes = milliseconds / 1000 / 60;
        const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
        return seconds < 10 ? `${Math.floor(minutes)}:0${seconds}` : `${Math.floor(minutes)}:${seconds}`;
    }

    function getRecordingLines() {
        return recordings.map((recordingLine, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 10, marginRight: 40 }}>
                <Text style={{ flex: 1, margin: 15 }}>
                    Recording #{index + 1} | {recordingLine.duration}
                </Text>
                <Button onPress={() => recordingLine.sound.replayAsync()} title="Play" />
            </View>
        ));
    }

    function clearRecordings() {
        setRecordings([]);
    }
    const capitalizeFirstLetter = (word: string) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    const [lockedRecordings, setLockedRecordings] = useState<any[]>([]);

    const submit = async () => {
        try {
            const urls = [];

            // Iterate over locked recordings and upload each to Firebase Storage
            for (let i = 0; i < lockedRecordings.length; i++) {
                const recording = lockedRecordings[i];

                if (recording?.file) {
                    const response = await fetch(recording.file); // Get the file from the URI
                    const blob = await response.blob(); // Convert the file to a Blob
                    const storageRef = ref(storage, `recordingsDis/${Date.now()}_${i}.mp3`);
                    // Upload the blob to Firebase Storage
                    await uploadBytes(storageRef, blob);
                    const downloadURL = await getDownloadURL(storageRef);
                    urls[i] = downloadURL;
                }
            }
            saveProgress();
            console.log("Uploaded recording URLs:", urls);
        } catch (error) {
            console.error("Error uploading recordings:", error);
        }
    };

    const saveProgress = async () => {
        const feedback = {
            word1: firstWord,
            word2: secondWord,
            status: "completed",
            level: "2",
            providedAnswers: lockedRecordings,
            patient: "Leo",
        };
        DiscriminationTaskService.saveDiscriminationActvityResponse(feedback)
            .then((data) => {
                console.log("Rhyming Words saved Successfully: ", data);
            })
            .catch((err) => {
                console.error("Error saving: ", err);
            });
    };

    return (
        <View className="flex-1 bg-white items-center">
            <View className="flex-col justify-start items-start p-5 w-full">
                <Text className="text-2xl font-bold mb-2 text-violet-800">Discrimination - Level 2</Text>
                <Text className="text-lg text-black-700 mt-5 mb-10">Listen, and Tell</Text>
            </View>

            <View className="flex-row justify-around w-full mb-20">
                <View className="items-center w-2/5">
                    <View>
                        <AnswerButton text={firstWord} character={''} />
                    </View>
                    <Text className="text-lg font-bold text-purple-700 mt-2">{capitalizeFirstLetter(firstWord)}</Text>
                </View>
                <View className="items-center w-2/5">
                    <View>
                        <AnswerButton text={secondWord} character={''} />
                    </View>
                    <Text className="text-lg font-bold text-purple-700 mt-2">{capitalizeFirstLetter(secondWord)}</Text>
                </View>
            </View>
            <View className="flex-row justify-between">
                <View className="flex-1 mr-2">
                    <SpeechInput
                        lockRecording={function (recording: any): void {
                            throw new Error('Function not implemented.');
                        }}
                        recordedAudio={undefined}
                    />
                </View>
                <View className="flex-1">
                    <SpeechInput
                        lockRecording={function (recording: any): void {
                            throw new Error('Function not implemented.');
                        }}
                        recordedAudio={undefined}
                    />
                </View>
            </View>
            <View className='mt-8'>
                <TouchableOpacity className="bg-purple-800 p-2 rounded-lg w-3/4 mx-auto" onPress={submit}>
                    <Text className="text-center text-base text-white font-bold">Check</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DiscriminationLevel2;
