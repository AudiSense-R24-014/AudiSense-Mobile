import { router } from 'expo-router';
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DashboardHeader from '@/components/organisms/DashboardHeader';


const Dashboard = () => {
  // TODO: Replace with user's name
  const name = "Leo";
  const title = `Hello Little ` + name + ` !`;
  return (
    <View>
      <SafeAreaView>
        <DashboardHeader title={title} />
        <Pressable onPress={() => router.push("/tasks/levels")} >
          <Text>Press me</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
};

export default Dashboard;