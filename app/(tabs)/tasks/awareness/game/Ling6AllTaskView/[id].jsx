import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Ling6AllTaskView() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <LinearGradient
                colors={['#8FBC8F', '#3CB371']}
                style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}
            >
                <TouchableOpacity
                    onPress={() => router.back()} // Navigates back to the previous screen
                    style={{ marginRight: 16 }}
                >
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-white flex-1 text-center">
                    Ling 6 - Combined View
                </Text>
            </LinearGradient>
            <View className="p-4">
                {id ? <Text className="text-lg">ID: {id}</Text> : <Text className="text-lg">No ID provided</Text>}
            </View>
        </SafeAreaView>
    );
}