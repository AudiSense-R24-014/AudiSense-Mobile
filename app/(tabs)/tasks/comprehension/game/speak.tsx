import React, { useEffect, useState } from "react";
import { View, SafeAreaView } from "react-native";
import ComprehensionHeader from "@/components/organisms/ComprehensionHeader";
import CircleWave from "@/components/molecules/CircleWave";
import ComprehensionTaskService from "@/services/ComprehensionTask.service";
import SpeechAssessModel from "@/components/organisms/SpeechAssessModel";
import { storage, ref, uploadBytes, getDownloadURL } from "@/firebaseConfig";
import { router, useLocalSearchParams } from "expo-router";

const Speak = () => {
    const { activityId } = useLocalSearchParams();
    const [passage, setPassage] = useState("");
    const [questions, setQuestions] = useState<
        {
            question: string;
            answerA: string;
            answerB: string;
            answerC: string;
            answerD: string;
            correctAnswer: string;
        }[]
    >([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [lockedRecordings, setLockedRecordings] = useState<any[]>([]);

    useEffect(() => {
        // Fetch the comprehension task
        ComprehensionTaskService.getActivityById(activityId)
            .then((data) => {
                setPassage(data?.comprehensionTask?.passage);
                setQuestions(data?.comprehensionTask?.questions);
            })
            .catch((error) => {
                console.error("Error fetching comprehension task:", error);
            });
    }, [activityId]);

    const updateLockedRecording = (index: number, newValue: any) => {
        setLockedRecordings((prevLockedRecordings) => {
            const updatedRecordings = [...prevLockedRecordings];
            updatedRecordings[index] = newValue;
            return updatedRecordings;
        });
    };
    const lockRecording = (recording: any) => {
        updateLockedRecording(currentQuestionIndex, recording);
    };

    const goToNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            console.log("You have reached the last question.");
        }
    };

    const goToPreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
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
                    const storageRef = ref(
                        storage,
                        `recordings/${Date.now()}_${i}.mp3`
                    );
                    // Upload the blob to Firebase Storage
                    await uploadBytes(storageRef, blob);
                    const downloadURL = await getDownloadURL(storageRef);
                    urls[i] = downloadURL;
                }
            }
            persist(urls);
            console.log("Uploaded recording URLs:", urls);
        } catch (error) {
            console.error("Error uploading recordings:", error);
        }
    };

    const persist = (recoringUrls: any[]) => {
        ComprehensionTaskService.updateActivityById(activityId, {
            providedAnswers: recoringUrls,
            status: "Need Assessment",
        })
            .then((data) => {
                console.log("Persisted locked answers:", data);
                router.back();
            })
            .catch((error) => {
                console.error("Error persisting locked answers:", error);
            });
    };

    return (
        <SafeAreaView className="flex-1 py-4 bg-gray-100 max-h-screen">
            <ComprehensionHeader
                title="Comprehension - Speech"
                subtitle="Listen to this amazing story!"
            />
            <View className="h-full">
                <CircleWave text={passage} />
                {questions.length > 0 && (
                    <SpeechAssessModel
                        question={questions[currentQuestionIndex]?.question}
                        lockRecording={lockRecording}
                        onNext={goToNextQuestion}
                        onBack={goToPreviousQuestion}
                        currentQuestionIndex={currentQuestionIndex}
                        totalQuestions={questions.length}
                        recordedAudio={lockedRecordings[currentQuestionIndex]}
                        submit={submit}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default Speak;
