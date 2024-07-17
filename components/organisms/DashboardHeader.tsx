import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type DashboardHeaderProps = {
    title: string;
    subtitle?: string;
};

const DashboardHeader = ({ title, subtitle }: DashboardHeaderProps) => {
    // TODO: Implement Drawer Navigation
    const handleMenuPress = () => {
        Alert.alert('TODO ! ', 'Implement Drawer Navigation');
    };

    return (
        <View>
            <View className='flex-row items-center justify-between px-4 py-2'>
                <View>
                    <Text className='text-2xl font-bold text-audi-purple'>{title}</Text>
                </View>
                <TouchableOpacity className="p-2" onPress={handleMenuPress}>
                    <Ionicons name="menu" size={30} color="#4B0082" />
                </TouchableOpacity>
            </View>
            <View className='px-4'>
                {subtitle && (
                    <Text className='text-base text-gray-700'>{subtitle}</Text>
                )}
            </View>
        </View>
    );
};

export default DashboardHeader;