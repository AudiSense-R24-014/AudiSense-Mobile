import { router } from 'expo-router';
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AllTasks = () => {
  return (
    <View>
      <SafeAreaView>
      <Text>All Tasks</Text>
      <Pressable onPress={() => router.push("/tasks/levels")} >
        <Text>Press me</Text>
      </Pressable>
      </SafeAreaView>
    </View>
  );
}

export default AllTasks;
