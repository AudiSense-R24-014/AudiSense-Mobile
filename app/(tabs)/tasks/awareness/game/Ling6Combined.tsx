import React from 'react';
import { ScrollView, Text, TouchableOpacity, SafeAreaView, Image, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';

interface TaskData {
    id: number;
    voice: string;
    rate: string;
    pitch: string;
    breakTime: string;
    soundUrl: string;
    patientID: string;
    createdAt: string;
}

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

const Ling6Combined: React.FC = () => {
    const router = useRouter();

    const data: TaskData[] = [
        {
            id: 1,
            voice: "en-US-AriaNeural",
            rate: "-25%",
            pitch: "0%",
            breakTime: "1s",
            soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6All/ling6_en-US-AriaNeural_combined_20240829225334.wav",
            patientID: "1234",
            createdAt: "2024-08-29T17:23:39.463Z",
        },
        {
            id: 2,
            voice: "en-US-AriaNeural",
            rate: "-25%",
            pitch: "0%",
            breakTime: "1s",
            soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6All/ling6_en-US-AriaNeural_combined_20240829225334.wav",
            patientID: "1234",
            createdAt: "2024-08-29T17:23:39.463Z",
        },
        {
            id: 3,
            voice: "en-US-AriaNeural",
            rate: "-25%",
            pitch: "0%",
            breakTime: "1s",
            soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6All/ling6_en-US-AriaNeural_combined_20240829225334.wav",
            patientID: "1234",
            createdAt: "2024-08-29T17:23:39.463Z",
        },
        {
            id: 4,
            voice: "en-US-AriaNeural",
            rate: "-25%",
            pitch: "0%",
            breakTime: "1s",
            soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6All/ling6_en-US-AriaNeural_combined_20240829225334.wav",
            patientID: "1234",
            createdAt: "2024-08-29T17:23:39.463Z",
        },
        {
            id: 5,
            voice: "en-US-AriaNeural",
            rate: "-25%",
            pitch: "0%",
            breakTime: "1s",
            soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6All/ling6_en-US-AriaNeural_combined_20240829225334.wav",
            patientID: "1234",
            createdAt: "2024-08-29T17:23:39.463Z",
        },
    ];

    const getUniqueRandomGradient = (previousGradient: string[]): string[] => {
        const availableGradients = gradientColors.filter(gradient => gradient !== previousGradient);
        const randomIndex = Math.floor(Math.random() * availableGradients.length);
        return availableGradients[randomIndex];
    };

    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    };

    const handleTaskPress = (taskId: number) => {
        router.push(`/tasks/awareness/game/Ling6AllTaskView/${taskId}`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#8FBC8F', '#3CB371']}
                style={styles.header}
            >
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Ling 6 - Combined Tasks</Text>
            </LinearGradient>

            <ScrollView style={styles.scrollView}>
                {data.reduce((acc: any[], item, index) => {
                    const previousGradient = acc[index - 1]?.gradient || null;
                    const currentGradient = getUniqueRandomGradient(previousGradient);
                    const randomImage = getRandomImage();

                    acc.push(
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => handleTaskPress(item.id)}
                            style={styles.taskContainer}
                        >
                            <LinearGradient
                                colors={currentGradient}
                                style={styles.taskGradient}
                            >
                                <View style={styles.taskDetails}>
                                    <Text style={styles.taskTitle}>Task Set {index + 1}</Text>
                                    <Text style={styles.taskDate}>
                                        Created: {moment(item.createdAt).format('MMMM Do, YYYY')}
                                    </Text>
                                </View>

                                <View style={styles.taskFooter}>
                                    <Text style={styles.taskStatus}>Incomplete</Text>
                                    <Image
                                        source={randomImage}
                                        style={styles.taskImage}
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
};

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
        fontSize: 24,
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
    taskGradient: {
        padding: 16,
        borderRadius: 8,
    },
    taskDetails: {
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
    taskImage: {
        width: 80,
        height: 80,
        marginLeft: 16,
    },
});

export default Ling6Combined;