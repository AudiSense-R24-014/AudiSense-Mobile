import { Text, TouchableOpacity, View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";


const Dashboard = () => {
  // TODO: Replace with user's name
  const name = "Leo";
  const title = `Hello Little ` + name + ` !`;
  return (
    <ScrollView>
      <View className="flex-1 bg-white">

        <View>
          <SafeAreaView>
            <Text>Dashboard</Text>
          </SafeAreaView>
        </View>
        <LinearGradient colors={['#A991D2', '#F7C0E9']} className="rounded-lg p-6 mb-4 h-36 justify-center relative mx-4 my-2">
          {/* <View className="flex-row p-4 bg-purple-400 mb-4 rounded-lg mx-4 my-2"> */}
          <View className="flex-row items-center">
            <Image source={require("../../assets/images/profilePictureSample.png")} className="w-20 h-20 rounded-full" />
            <View className="ml-4">
              <Text className="text-lg text-white font-bold">Chamodh Leo</Text>
              <Text className="text-sm text-white">leo@example.com</Text>
              <Text className="text-sm text-white">Age: 08</Text>
              <Text className="text-sm text-white">Hearing Age: 04</Text>
            </View>
          </View>
          {/* </View> */}
        </LinearGradient>

        <LinearGradient colors={['#927AFF', '#ADA1E2']} className="flex-row rounded-lg mb-4 h-auto mx-4 my-2 items-center">
          {/* <View className="flex-row p-4 bg-violet-800 mb-4 rounded-lg mx-4 my-2 h-20"> */}
          <View className="-mb-3">
            <Image source={require('../../assets/images/starImage.png')} className="w-22 h-22" />
          </View>
          <Text className="text-lg text-white font-bold">Your Current Score: 120</Text>
          {/* </View> */}
        </LinearGradient>

        <LinearGradient colors={['#A991D2', '#F7C0E9']} className="mx-4 my-2 rounded-lg">
          <View className=" p-4 mb-4 mx-4 my-2">
            <Text className="text-lg font-bold mb-4 text-white">Recent Tasks</Text>
            <View className="flex-row justify-between mb-4 border-b-2 p-2 border-white">
              <Text className="text-base text-white">Awareness</Text>
              <View className="flex-row items-center">
                <Text className="text-sm mr-4 text-white">Level 02</Text>
                <Text className="text-sm text-white">COMPLETED</Text>
              </View>
            </View>
            <View className="flex-row justify-between mb-4 border-b-2 p-2 border-white">
              <Text className="text-base text-white">Discrimination</Text>
              <View className="flex-row items-center">
                <Text className="text-sm mr-4 text-white">Level 01</Text>
                <Text className="text-sm text-white">COMPLETED</Text>
              </View>
            </View>
            <View className="flex-row justify-between mb-4 border-b-2 p-2 border-white">
              <Text className="text-base text-white">Identification</Text>
              <View className="flex-row items-center">
                <Text className="text-sm mr-4 text-white">Level 01</Text>
                <Text className="text-sm text-white">COMPLETED</Text>
              </View>
            </View>
            <View className="p-2 rounded  text-base text-center mx-12 ">
              <TouchableOpacity className="bg-white p-2 rounded-lg w-48" onPress={()=>router.push("../tasks/discrimination/levelOne")}>
                <Text className="text-violet-800 font-bold text-center">More</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        <View className="bg-white p-4 mb-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold mb-4">PROGRESS</Text>
            <Text className="text-sm mb-4">07 Months Jan-July</Text>
          </View>
          <View className="h-40">
            {/* Add your chart library here */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Dashboard;