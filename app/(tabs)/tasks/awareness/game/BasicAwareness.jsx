import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons'; // Importing icon library
import { LinearGradient } from 'expo-linear-gradient'; // Importing LinearGradient

export default function BasicAwareness() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header Section with Back Button */}
            <LinearGradient
                colors={['#927AFF', '#ADA1E2']} // Purple gradient colors
                style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}
            >
                <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-white flex-1 text-center">
                    Basic Awareness Tasks
                </Text>
            </LinearGradient>

            {/* Main Content Section */}
            <View className="flex-1 justify-center items-center p-4">
                <Text className="text-lg text-gray-700">Here is where your content will go.</Text>
            </View>
        </SafeAreaView>
    );
}