import { router } from 'expo-router';
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import DashboardHeaher from '@/components/organisms/DashboardHeader';

const AllTasks = () => {
  // TODO: Replace with user's name
  const name = "Leo";
  const title = `Hello Little ` + name + ` !`;
  const subtitle = 'Let’s Begin Your Hearing Journey Here';
  return (
    <View>
      <SafeAreaView>
        <DashboardHeaher title={title} subtitle={subtitle} />
        <Pressable onPress={() => router.push("/tasks/levels")} >
          <Text>Press me</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

export default AllTasks;
