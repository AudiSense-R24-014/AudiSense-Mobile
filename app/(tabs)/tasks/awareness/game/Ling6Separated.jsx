import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons'; // Importing icon library
import { LinearGradient } from 'expo-linear-gradient'; // Importing LinearGradient
import moment from 'moment';

export default function Ling6Separated() {
    const router = useRouter();

    const data = [
        {
            id: 1,
            sounds: [
                {
                    sound: "ah",
                    soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_ah_20240829222737.wav",
                },
                {
                    sound: "mm",
                    soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_mm_20240829222737.wav",
                },
                {
                    sound: "sh",
                    soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_sh_20240829222737.wav",
                },
                {
                    sound: "ss",
                    soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_ss_20240829222737.wav",
                },
                {
                    sound: "ee",
                    soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_ee_20240829222737.wav",
                },
                {
                    sound: "oo",
                    soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_oo_20240829222737.wav",
                }
            ],
            voice: "en-US-AriaNeural",
            rate: "-25%",
            pitch: "0%",
            patientID: null,
            createdAt: "2024-08-29T16:58:03.433Z",
        },
        {
            id: 2,
            sounds: [
                {
                    sound: "ah",
                    soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_ah_20240829222737.wav",
                },
                {
                    sound: "mm",
                    soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_mm_20240829222737.wav",
                },
                {
                    sound: "sh",
                    soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_sh_20240829222737.wav",
                },
                {
                    sound: "ss",
                    soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_ss_20240829222737.wav",
                },
                {
                    sound: "ee",
                    soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_ee_20240829222737.wav",
                },
                {
                    sound: "oo",
                    soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_oo_20240829222737.wav",
                }
            ],
            voice: "en-US-AriaNeural",
            rate: "-25%",
            pitch: "0%",
            patientID: null,
            createdAt: "2024-08-29T16:58:03.433Z",
        },
        {
            id: 3,
            sounds: [
                {
                    sound: "ah",
                    soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_ah_20240829222737.wav",
                },
                {
                    sound: "mm",
                    soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_mm_20240829222737.wav",
                },
                {
                    sound: "sh",
                    soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_sh_20240829222737.wav",
                },
                {
                    sound: "ss",
                    soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_ss_20240829222737.wav",
                },
                {
                    sound: "ee",
                    soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_ee_20240829222737.wav",
                },
                {
                    sound: "oo",
                    soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_oo_20240829222737.wav",
                }
            ],
            voice: "en-US-AriaNeural",
            rate: "-25%",
            pitch: "0%",
            patientID: null,
            createdAt: "2024-08-29T16:58:03.433Z",
        }, {
            id: 4,
            sounds: [
                {
                    sound: "ah",
                    soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_ah_20240829222737.wav",
                },
                {
                    sound: "mm",
                    soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_mm_20240829222737.wav",
                },
                {
                    sound: "sh",
                    soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_sh_20240829222737.wav",
                },
                {
                    sound: "ss",
                    soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_ss_20240829222737.wav",
                },
                {
                    sound: "ee",
                    soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_ee_20240829222737.wav",
                },
                {
                    sound: "oo",
                    soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_oo_20240829222737.wav",
                }
            ],
            voice: "en-US-AriaNeural",
            rate: "-25%",
            pitch: "0%",
            patientID: null,
            createdAt: "2024-08-29T16:58:03.433Z",
        },
        {
            id: 5,
            sounds: [
                {
                    sound: "ah",
                    soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_ah_20240829222737.wav",
                },
                {
                    sound: "mm",
                    soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_mm_20240829222737.wav",
                },
                {
                    sound: "sh",
                    soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_sh_20240829222737.wav",
                },
                {
                    sound: "ss",
                    soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_ss_20240829222737.wav",
                },
                {
                    sound: "ee",
                    soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_ee_20240829222737.wav",
                },
                {
                    sound: "oo",
                    soundUrl: "https://storage.googleapis.com/cdap-awareness.appspot.com/ling6separate/ling6_en-US-AriaNeural_oo_20240829222737.wav",
                }
            ],
            voice: "en-US-AriaNeural",
            rate: "-25%",
            pitch: "0%",
            patientID: null,
            createdAt: "2024-08-29T16:58:03.433Z",
        }
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