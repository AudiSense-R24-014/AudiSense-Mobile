import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

import AwarenessSoundTaskService from '@/services/AwarenessService/AwarenessSoundTask.service';
import Ling6AllTaskService from '@/services/AwarenessService/Ling6AllTask.service';
import Ling6SeparateService from '@/services/AwarenessService/Ling6Separate.service';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Levels = () => {
  const router = useRouter();
  const [patientID, setPatientID] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatientID = async () => {
      try {
        const storedPatientID = await AsyncStorage.getItem("audi-patient");
        if (storedPatientID) {
          setPatientID(JSON.parse(storedPatientID)?._id);
        }
      } catch (error) {
        console.error("Error retrieving patient from AsyncStorage:", error);
      }
    };

    fetchPatientID();
  }, []);

  const [basicTaskCount, setBasicTaskCount] = useState(0);
  const [ling6CombinedTaskCount, setLing6CombinedTaskCount] = useState(0);
  const [ling6SeparatedTaskCount, setLing6SeparatedTaskCount] = useState(0);

  AwarenessSoundTaskService.getAwarenessSoundTasksByPatientId(patientID)
    .then((response) => {
      const unrespondedTasks = response.filter((task: { isResponded: any; }) => !task.isResponded);
      setBasicTaskCount(unrespondedTasks.length);
    })
    .catch((error) => {
      console.error("Error fetching tasks:", error);
    });

  Ling6AllTaskService.getLing6AllTasksByPatientId(patientID)
    .then((response) => {
      const unrespondedTasks = response.filter((task: { isResponded: any; }) => !task.isResponded);
      setLing6CombinedTaskCount(unrespondedTasks.length);
    })
    .catch((error) => {
      console.error("Error fetching tasks:", error);
    });

  Ling6SeparateService.getLing6SeparateTasksByPatientId(patientID)
    .then((response) => {
      const unrespondedTasks = response.filter((task: { isResponded: any; }) => !task.isResponded);
      setLing6SeparatedTaskCount(unrespondedTasks.length);
    })
    .catch((error) => {
      console.error("Error fetching tasks:", error
      );
    });

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="items-center">
        {/* Header Decoration */}
        <View className="mb-4 mx-4 p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
          <Text className="text-3xl font-extrabold text-purple-500 text-center shadow-lg">Awareness Tasks</Text>
        </View>

        <View className="p-2">
          {/* Basic Awareness Tasks Gradient */}
          <TouchableOpacity onPress={() => router.push('/tasks/awareness/game/BasicAwareness')}>
            <LinearGradient colors={['#927AFF', '#ADA1E2']} className="flex-row rounded-lg mb-4 p-4 mx-4 items-center">
              <Image source={require('../../../../assets/images/starImage.png')} className="w-32 h-32 mr-4" />
              <View>
                <Text className="text-lg text-white font-bold">Basic Awareness Tasks</Text>
                <Text className="text-sm text-white font-bold">{basicTaskCount} Tasks Available</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Ling 6 - Combined Tasks Gradient */}
          <TouchableOpacity onPress={() => router.push('/tasks/awareness/game/Ling6Combined')}>
            <LinearGradient colors={['#8FBC8F', '#3CB371']} className="flex-row rounded-lg mb-4 p-4 mx-4 items-center">
              <Image source={require('../../../../assets/images/starImage.png')} className="w-32 h-32 mr-4" />
              <View>
                <Text className="text-lg text-white font-bold">Ling 6 - Combined Tasks</Text>
                <Text className="text-sm text-white font-bold">{ling6CombinedTaskCount} Tasks Available</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Ling 6 - Separated Tasks Gradient */}
          <TouchableOpacity onPress={() => router.push('/tasks/awareness/game/Ling6Separated')}>
            <LinearGradient colors={['#00BFFF', '#1E90FF']} className="flex-row rounded-lg mb-4 p-4 mx-4 items-center">
              <Image source={require('../../../../assets/images/starImage.png')} className="w-32 h-32 mr-4" />
              <View>
                <Text className="text-lg text-white font-bold">Ling 6 - Separated Tasks</Text>
                <Text className="text-sm text-white font-bold">{ling6SeparatedTaskCount} Tasks Available</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </View>
  );
};

export default Levels;