import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
// import { Audio } from 'expo-av';
// import { TailwindProvider } from 'tailwindcss-react-native';

const DiscriminationLevel2 = () => {
    const [isPlayingFour, setIsPlayingFour] = useState(false);
    const [isPlayingRoar, setIsPlayingRoar] = useState(false);

    return (

        <View className="flex-1 bg-white items-center">
            <View className="flex-col justify-start items-start p-5 w-full">
                <Text className="text-2xl font-bold mb-2 text-violet-800">Discrimination - Level 2</Text>
                <Text className="text-lg text-black-700 mt-5 mb-10">Listen, and Tell</Text>
            </View>
            <View className="flex-row justify-around w-full mb-20">
                <View className="items-center w-2/5">
                    <TouchableOpacity
                        className="bg-purple-100 p-5 rounded-lg items-center"
                        disabled={isPlayingFour}
                    >
                        <View className="flex-row items-center w-4/5 h-1 bg-gray-300 rounded">
                            {isPlayingFour ? (
                                <Image className="w-5 h-5 mr-2" />
                            ) : (
                                <Image className="w-5 h-5 mr-2" />
                            )}
                            <View className="flex-1 h-1 bg-purple-700 rounded" />
                        </View>
                    </TouchableOpacity>
                    <Text className="text-lg font-bold text-purple-700 mt-2">Four</Text>
                </View>
                <View className="items-center w-2/5">
                    <TouchableOpacity
                        className="bg-purple-100 p-5 rounded-lg items-center"
                        disabled={isPlayingRoar}
                    >
                        <View className="flex-row items-center w-4/5 h-1 bg-gray-300 rounded">
                            {isPlayingRoar ? (
                                <Image className="w-5 h-5 mr-2" />
                            ) : (
                                <Image className="w-5 h-5 mr-2" />
                            )}
                            <View className="flex-1 h-1 bg-purple-700 rounded" />
                        </View>
                    </TouchableOpacity>
                    <Text className="text-lg font-bold text-purple-700 mt-2">Roar</Text>
                </View>
            </View>
            <View className="flex-row justify-center mb-20 space-x-32">
                <TouchableOpacity className="bg-purple-700 p-5 rounded-full">
                    <Image className="w-8 h-8" />
                </TouchableOpacity>
                <TouchableOpacity className="bg-purple-700 p-5 rounded-full">
                    <Image className="w-8 h-8" />
                </TouchableOpacity>
            </View>

        </View>

    );
};

export default DiscriminationLevel2;