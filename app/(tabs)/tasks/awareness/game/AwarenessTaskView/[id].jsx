import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AwarenessTaskView() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <LinearGradient
                colors={['#927AFF', '#ADA1E2']}
                style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}
            >
                <TouchableOpacity
                    onPress={() => router.back()} // Replace with router.back() or similar
                    style={{ marginRight: 16 }}
                >
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', flex: 1, textAlign: 'center' }}>
                    Awareness Task View
                </Text>
            </LinearGradient>
            <View style={{ padding: 16 }}>
                {id ? <Text>ID: {id}</Text> : <Text>No ID provided</Text>}
            </View>
        </SafeAreaView>
    );
}