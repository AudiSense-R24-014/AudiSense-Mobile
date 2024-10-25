import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Button } from 'react-native';
import DiscriminationTaskService from '@/services/DiscriminationTask.service';
import AnswerButton from '@/components/molecules/AnswerButton';
import SpeechInput from '@/components/molecules/SpeechInput';
import { storage, ref, uploadBytes, getDownloadURL } from "@/firebaseConfig";

const DiscriminationLevel2 = () => {
    const [firstWord, setFirstWord] = useState("");
    const [secondWord, setSecondWord] = useState("");
    const [lockedRecordings, setLockedRecordings] = useState<any[]>([]);
    

    useEffect(() => {
        DiscriminationTaskService.getDiscriminationTaskById("66db2163230c2790b39a8df3").then((data) => {
            setFirstWord(data?.word1);
            setSecondWord(data?.word2);
        });
    }, []);


    const updateLockedRecording = (index: number, newValue: any) => {
        setLockedRecordings((prevLockedRecordings) => {
          const updatedRecordings = [...prevLockedRecordings];
          updatedRecordings[index] = newValue;
          return updatedRecordings;
        });
      };
      

    const capitalizeFirstLetter = (word: string) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    

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
            saveProgress(urls);
            console.log("Uploaded recording URLs:", urls);
        } catch (error) {
            console.error("Error uploading recordings:", error);
        }
    };

    const saveProgress = async (urls:any[]) => {
        const feedback = {
            word1: firstWord,
            word2: secondWord,
            status: "completed",
            level: "2",
            providedAnswers: urls,
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
                        <AnswerButton text={"Hello"} character={''} />
                    </View>
                    <Text className="text-lg font-bold text-purple-700 mt-2">{capitalizeFirstLetter("Hello")}</Text>
                </View>
                <View className="items-center w-2/5">
                    <View>
                        <AnswerButton text={"Mellow"} character={''} />
                    </View>
                    <Text className="text-lg font-bold text-purple-700 mt-2">{capitalizeFirstLetter("Mellow")}</Text>
                </View>
            </View>
            <View className="flex-row justify-between">
                <View className="flex-1 mr-2">
                    <SpeechInput
                        lockRecording={function (recording: any): void {
                            updateLockedRecording(0, recording);
                        }}
                        recordedAudio={lockedRecordings[0]?lockedRecordings[0]:undefined} 
                    />
                </View>
                <View className="flex-1">
                    <SpeechInput
                        lockRecording={function (recording: any): void {
                            updateLockedRecording(1, recording);
                        }}
                        recordedAudio={lockedRecordings[1]?lockedRecordings[1]:undefined}
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
