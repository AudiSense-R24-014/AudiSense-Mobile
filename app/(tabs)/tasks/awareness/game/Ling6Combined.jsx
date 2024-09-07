import { ScrollView, Text, TouchableOpacity, SafeAreaView, Image, View } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';

export default function Ling6Combined() {
    const router = useRouter();

    const data = [
        {
            id: 1,
            voice: "en-US-AriaNeural",
            rate: "-25%",
            pitch: "0%",
            breakTime: "1s",
            soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6All/ling6_en-US-AriaNeural_combined_20240829225334.wav",
            patientID: "1234",
            createdAt: "2024-08-29T17:23:39.463Z",
        }, {
            id: 2,
            voice: "en-US-AriaNeural",
            rate: "-25%",
            pitch: "0%",
            breakTime: "1s",
            soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6All/ling6_en-US-AriaNeural_combined_20240829225334.wav",
            patientID: "1234",
            createdAt: "2024-08-29T17:23:39.463Z",
        }, {
            id: 3,
            voice: "en-US-AriaNeural",
            rate: "-25%",
            pitch: "0%",
            breakTime: "1s",
            soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6All/ling6_en-US-AriaNeural_combined_20240829225334.wav",
            patientID: "1234",
            createdAt: "2024-08-29T17:23:39.463Z",
        }, {
            id: 4,
            voice: "en-US-AriaNeural",
            rate: "-25%",
            pitch: "0%",
            breakTime: "1s",
            soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6All/ling6_en-US-AriaNeural_combined_20240829225334.wav",
            patientID: "1234",
            createdAt: "2024-08-29T17:23:39.463Z",
        }, {
            id: 5,
            voice: "en-US-AriaNeural",
            rate: "-25%",
            pitch: "0%",
            breakTime: "1s",
            soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6All/ling6_en-US-AriaNeural_combined_20240829225334.wav",
            patientID: "1234",
            createdAt: "2024-08-29T17:23:39.463Z",
        }
    ];

    const gradientColors = [
        ['#927AFF', '#ADA1E2'],
        ['#FF6347', '#FF4500'],
        ['#3CB371', '#2E8B57'],
        ['#00BFFF', '#1E90FF'],
        ['#FFD700', '#FFA500'],
    ];

    const images = [
        require('../../../../../assets/images/starImage.png'),
        require('../../../../../assets/images/dices.png'),
        require('../../../../../assets/images/toycar.png'),
        require('../../../../../assets/images/balls.webp'),
    ];

    const getUniqueRandomGradient = (previousGradient) => {
        const availableGradients = gradientColors.filter(gradient => gradient !== previousGradient);
        const randomIndex = Math.floor(Math.random() * availableGradients.length);
        return availableGradients[randomIndex];
    };

    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    };

    const handleTaskPress = (taskId) => {
        // Navigate to the detail page for the specific task
        router.push(`/tasks/awareness/game/Ling6AllTaskView/${taskId}`);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <LinearGradient
                colors={['#8FBC8F', '#3CB371']} // Change gradient colors as needed
                style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}
            >
                <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', flex: 1, textAlign: 'center' }}>
                    Ling 6 - Combined Tasks
                </Text>
            </LinearGradient>

            <ScrollView style={{ flex: 1, padding: 16 }}>
                {data.reduce((acc, item, index) => {
                    const previousGradient = acc[index - 1]?.gradient || null;
                    const currentGradient = getUniqueRandomGradient(previousGradient);
                    const randomImage = getRandomImage();

                    acc.push(
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => handleTaskPress(item.id)}
                            style={{ marginBottom: 16 }}
                        >
                            <LinearGradient
                                colors={currentGradient}
                                style={{ padding: 16, borderRadius: 8 }}
                            >
                                <View style={{ marginBottom: 8 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                                        Task Set {index + 1}
                                    </Text>
                                    <Text style={{ fontSize: 14, color: 'white' }}>
                                        Created: {moment(item.createdAt).format('MMMM Do, YYYY')}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', flex: 1 }}>
                                        Incomplete
                                    </Text>
                                    <Image
                                        source={randomImage}
                                        style={{ width: 80, height: 80, marginLeft: 16 }}
                                    />
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    );
                    acc[index].gradient = currentGradient;
                    return acc;
                }, [])}
            </ScrollView>
        </SafeAreaView>
    );
}