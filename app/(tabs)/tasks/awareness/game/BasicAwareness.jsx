import { ScrollView, Text, TouchableOpacity, SafeAreaView, Image, View } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';

export default function BasicAwareness() {
    const router = useRouter();

    const data = [
        {
            id: 1,
            sounds: [
                {
                    name: "church_bells",
                    url: "https://storage.googleapis.com/cdap-awareness.appspot.com/awarenessAudio/church_bells_20240828224154.wav",
                },
                {
                    name: "clock_tick",
                    url: "https://storage.googleapis.com/cdap-awareness.appspot.com/awarenessAudio/clock_tick_20240828224034.wav",
                },
                {
                    name: "car_horn",
                    url: "https://storage.googleapis.com/cdap-awareness.appspot.com/awarenessAudio/car_horn_20240828224036.wav",
                }
            ],
            createdAt: "2024-08-28T17:10:38.981Z",
        },
        {
            id: 2,
            sounds: [
                {
                    name: "church_bells",
                    url: "https://storage.googleapis.com/cdap-awareness.appspot.com/awarenessAudio/church_bells_20240828224154.wav",
                },
                {
                    name: "clock_tick",
                    url: "https://storage.googleapis.com/cdap-awareness.appspot.com/awarenessAudio/clock_tick_20240828224034.wav",
                },
                {
                    name: "car_horn",
                    url: "https://storage.googleapis.com/cdap-awareness.appspot.com/awarenessAudio/car_horn_20240828224036.wav",
                }
            ],
            createdAt: "2024-08-28T17:10:38.981Z",
        },
        {
            id: 3,
            sounds: [
                {
                    name: "church_bells",
                    url: "https://storage.googleapis.com/cdap-awareness.appspot.com/awarenessAudio/church_bells_20240828224154.wav",
                },
                {
                    name: "clock_tick",
                    url: "https://storage.googleapis.com/cdap-awareness.appspot.com/awarenessAudio/clock_tick_20240828224034.wav",
                },
                {
                    name: "car_horn",
                    url: "https://storage.googleapis.com/cdap-awareness.appspot.com/awarenessAudio/car_horn_20240828224036.wav",
                }
            ],
            createdAt: "2024-08-28T17:10:38.981Z",
        },
        {
            id: 4,
            sounds: [
                {
                    name: "church_bells",
                    url: "https://storage.googleapis.com/cdap-awareness.appspot.com/awarenessAudio/church_bells_20240828224154.wav",
                },
                {
                    name: "clock_tick",
                    url: "https://storage.googleapis.com/cdap-awareness.appspot.com/awarenessAudio/clock_tick_20240828224034.wav",
                },
                {
                    name: "car_horn",
                    url: "https://storage.googleapis.com/cdap-awareness.appspot.com/awarenessAudio/car_horn_20240828224036.wav",
                }
            ],
            createdAt: "2024-08-28T17:10:38.981Z",
        },
        {
            id: 5,
            sounds: [
                {
                    name: "church_bells",
                    url: "https://storage.googleapis.com/cdap-awareness.appspot.com/awarenessAudio/church_bells_20240828224154.wav",
                },
                {
                    name: "clock_tick",
                    url: "https://storage.googleapis.com/cdap-awareness.appspot.com/awarenessAudio/clock_tick_20240828224034.wav",
                },
                {
                    name: "car_horn",
                    url: "https://storage.googleapis.com/cdap-awareness.appspot.com/awarenessAudio/car_horn_20240828224036.wav",
                }
            ],
            createdAt: "2024-08-28T17:10:38.981Z",
        },
    ]

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
        router.push(`/tasks/awareness/game/AwarenessTaskView/${taskId}`);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <LinearGradient
                colors={['#927AFF', '#ADA1E2']}
                style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}
            >
                <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-white flex-1 text-center">
                    Basic Awareness Tasks
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