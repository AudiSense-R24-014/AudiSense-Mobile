import { ScrollView, Text, TouchableOpacity, SafeAreaView, Image, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import React, { useState, useEffect } from 'react';

import AwarenessSoundTaskService from '@/services/AwarenessService/AwarenessSoundTask.service';

// Define the type for the sound object
interface Sound {
    name: string;
    url: string;
}

// Define the type for each item in the data array
interface DataItem {
    _id: string;
    sounds: Sound[];
    isResponded: boolean;
    createdAt: string;
}

// Define the types for the gradient colors and images arrays
type GradientColors = [string, string];
const gradientColors: GradientColors[] = [
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

export default function BasicAwareness() {
    const router = useRouter();

    const patientID = '66dc2b782c63571bf9060f94'

    const [data, setData] = useState<DataItem[]>([]);

    useEffect(() => {
        AwarenessSoundTaskService.getAwarenessSoundTasksByPatientId(patientID)
            .then((response) => {
                setData(response);
            });
    }, []);

    const getUniqueRandomGradient = (previousGradient: GradientColors | null): GradientColors => {
        const availableGradients = gradientColors.filter(gradient => gradient !== previousGradient);
        const randomIndex = Math.floor(Math.random() * availableGradients.length);
        return availableGradients[randomIndex];
    };

    const getRandomImage = (): any => {
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    };

    const handleTaskPress = (taskId: string) => {
        router.push(`/tasks/awareness/game/AwarenessTaskView/${taskId}`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#927AFF', '#ADA1E2']}
                style={styles.header}
            >
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                    Basic Awareness Tasks
                </Text>
            </LinearGradient>

            <ScrollView style={styles.scrollView}>
                {data.reduce((acc: any[], item: DataItem, index: number) => {
                    const previousGradient = acc[index - 1]?.gradient || null;
                    const currentGradient = getUniqueRandomGradient(previousGradient);
                    const randomImage = getRandomImage();

                    acc.push(
                        <TouchableOpacity
                            key={item._id}
                            onPress={() => handleTaskPress(item._id)}
                            style={styles.taskContainer}
                        >
                            <LinearGradient
                                colors={currentGradient}
                                style={styles.gradient}
                            >
                                <View style={styles.taskHeader}>
                                    <Text style={styles.taskTitle}>
                                        Task Set {index + 1}
                                    </Text>
                                    <Text style={styles.taskDate}>
                                        Created: {moment(item.createdAt).format('MMMM Do, YYYY')}
                                    </Text>
                                </View>

                                <View style={styles.taskFooter}>
                                    <Text style={styles.taskStatus}>
                                        {item.isResponded ? 'Completed' : 'Not Completed'}
                                    </Text>
                                    <Image
                                        source={randomImage}
                                        style={styles.image}
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
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        flex: 1,
        textAlign: 'center',
    },
    scrollView: {
        flex: 1,
        padding: 16,
    },
    taskContainer: {
        marginBottom: 16,
    },
    gradient: {
        padding: 16,
        borderRadius: 8,
    },
    taskHeader: {
        marginBottom: 8,
    },
    taskTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    taskDate: {
        fontSize: 14,
        color: 'white',
    },
    taskFooter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    taskStatus: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        flex: 1,
    },
    image: {
        width: 80,
        height: 80,
        marginLeft: 16,
    },
});