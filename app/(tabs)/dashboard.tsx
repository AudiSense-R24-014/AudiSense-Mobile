import { router } from 'expo-router';
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DashboardHeaher from '@/components/organs/DashboardHeaher';


const Dashboard = () => {
  return (
    <View>
      <SafeAreaView>
        {/* <Text>All Tasks</Text> */}
        <DashboardHeaher />

        <Pressable onPress={() => router.push("/tasks/levels")} >
          <Text>Press me</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
};

export default Dashboard;