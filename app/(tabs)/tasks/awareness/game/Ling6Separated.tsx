import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons'; // Importing icon library
import { LinearGradient } from 'expo-linear-gradient'; // Importing LinearGradient
import moment from 'moment';

import Ling6SeparateService from '@/services/AwarenessService/Ling6Separate.service';

// Define the types for the data structure
type Sound = {
    sound: string;
    soundUrl: string;
};

type TaskSet = {
    _id: string;
    sounds: Sound[];
    voice: string;
    rate: string;
    pitch: string;
    patientID: string | null;
    createdAt: string;
};

export default function Ling6Separated() {
    const router = useRouter();

    const patientID = '66dc2b782c63571bf9060f94'

    const [data, setData] = useState<TaskSet[]>([]);

    useEffect(() => {
        Ling6SeparateService.getLing6SeparateTasksByPatientId(patientID)
            .then((response) => {
                setData(response);
            });
    }, []);

    const gradientColors: string[][] = [
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

    const getUniqueRandomGradient = (previousGradient: string[] | null): string[] => {
        const availableGradients = gradientColors.filter(gradient => gradient !== previousGradient);
        const randomIndex = Math.floor(Math.random() * availableGradients.length);
        return availableGradients[randomIndex];
    };

    const getRandomImage = (): any => {
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    };

    const handleTaskPress = (taskId: string) => {
        // Navigate to the detail page for the specific task
        router.push(`/tasks/awareness/game/Ling6SeparateTaskView/${taskId}`);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <LinearGradient
                colors={['#00BFFF', '#1E90FF']} // Change gradient colors as needed
                style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}
            >
                <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', flex: 1, textAlign: 'center' }}>
                    Ling 6 - Separated Tasks
                </Text>
            </LinearGradient>

            <ScrollView style={{ flex: 1, padding: 16 }}>
                {data.reduce<JSX.Element[]>((acc, item, index) => {
                    const previousGradient = acc[index - 1]?.props.children.props.style?.colors || null;
                    const currentGradient = getUniqueRandomGradient(previousGradient);
                    const randomImage = getRandomImage();

                    acc.push(
                        <TouchableOpacity
                            key={item._id}
                            onPress={() => handleTaskPress(item._id)}
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

                    return acc;
                }, [])}
            </ScrollView>
        </SafeAreaView>
    );
}