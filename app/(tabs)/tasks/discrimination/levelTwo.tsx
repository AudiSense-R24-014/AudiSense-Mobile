import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Button } from 'react-native';
import { Audio } from 'expo-av';
import DiscriminationTaskService from '@/services/DiscriminationTask.service';

const DiscriminationLevel2 = () => {
    const [isPlayingFour, setIsPlayingFour] = useState(false);
    const [isPlayingRoar, setIsPlayingRoar] = useState(false);
    const [recordingAudio, setRecordingAudio] = useState<any>();
    const [recordings, setRecordings] = useState<{ sound: any; duration: string; file: any; }[]>([]);

    const [firstWord, setFirstWord] = useState("");
    const [secondWord, setSecondWord] = useState("");
  
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

    function getDurationFormatted(milliseconds:any) {
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

    return (
        <View className="flex-1 bg-white items-center">
            <View className="flex-col justify-start items-start p-5 w-full">
                <Text className="text-2xl font-bold mb-2 text-violet-800">Discrimination - Level 2</Text>
                <Text className="text-lg text-black-700 mt-5 mb-10">Listen, and Tell</Text>
            </View>

            <View className="flex-row justify-around w-full mb-20">
                <View className="items-center w-2/5">
                    <TouchableOpacity
                        className="bg-purple-100 p-5 rounded-lg items-center"
                        disabled={isPlayingFour}
                    >
                        <View className="flex-row items-center w-4/5 h-1 bg-gray-300 rounded">
                            <Image className="w-5 h-5 mr-2" />
                            <View className="flex-1 h-1 bg-purple-700 rounded" />
                        </View>
                    </TouchableOpacity>
                    <Text className="text-lg font-bold text-purple-700 mt-2">Four</Text>
                </View>
                <View className="items-center w-2/5">
                    <TouchableOpacity
                        className="bg-purple-100 p-5 rounded-lg items-center"
                        disabled={isPlayingRoar}
                    >
                        <View className="flex-row items-center w-4/5 h-1 bg-gray-300 rounded">
                            <Image className="w-5 h-5 mr-2" />
                            <View className="flex-1 h-1 bg-purple-700 rounded" />
                        </View>
                    </TouchableOpacity>
                    <Text className="text-lg font-bold text-purple-700 mt-2">Roar</Text>
                </View>
            </View>

            <View className="flex-row justify-center mb-20 space-x-32">
                <TouchableOpacity
                    className="bg-purple-700 p-5 rounded-full"
                    onPress={recordingAudio ? stopRecording : startRecording}
                >
                    <Text style={{ color: 'white', fontSize: 16 }}>{recordingAudio ? 'Stop' : 'Start'}</Text>
                </TouchableOpacity>
            </View>

            {getRecordingLines()}

            {recordings.length > 0 && (
                <TouchableOpacity onPress={clearRecordings} className="bg-red-500 p-5 rounded-lg">
                    <Text style={{ color: 'white', fontSize: 16 }}>Clear Recordings</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default DiscriminationLevel2;
