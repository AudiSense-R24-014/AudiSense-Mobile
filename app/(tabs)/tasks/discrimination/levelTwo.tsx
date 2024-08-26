// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, Image } from 'react-native';
// import { Audio } from 'expo-av';
// import { TailwindProvider } from 'tailwindcss-react-native';

// const DiscriminationLevel2 = () => {
//   const [isPlayingFour, setIsPlayingFour] = useState(false);
//   const [isPlayingRoar, setIsPlayingRoar] = useState(false);

//   const soundFour = new Audio.Sound();
//   const soundRoar = new Audio.Sound();

//   const playSoundFour = async () => {
//     setIsPlayingFour(true);
//     try {
//       await soundFour.loadAsync(require('./assets/four.mp3'));
//       await soundFour.playAsync();
//       soundFour.setOnPlaybackStatusUpdate((status) => {
//         if (status.finished) {
//           setIsPlayingFour(false);
//           soundFour.unloadAsync();
//         }
//       });
//     } catch (error) {
//       console.error('Failed to play sound: ', error);
//     }
//   };

//   const playSoundRoar = async () => {
//     setIsPlayingRoar(true);
//     try {
//       await soundRoar.loadAsync(require('./assets/roar.mp3'));
//       await soundRoar.playAsync();
//       soundRoar.setOnPlaybackStatusUpdate((status) => {
//         if (status.finished) {
//           setIsPlayingRoar(false);
//           soundRoar.unloadAsync();
//         }
//       });
//     } catch (error) {
//       console.error('Failed to play sound: ', error);
//     }
//   };

//   return (
//     <TailwindProvider>
//       <View className="flex-1 bg-white items-center">
//         <View className="flex-row justify-between items-center p-5 w-full">
//           <Text className="text-2xl font-bold text-purple-700">Discrimination - Level 2</Text>
//           <View className="flex-row items-center">
//             <Text className="text-lg font-bold text-purple-700 mr-1">602</Text>
//             <Image source={require('./assets/star.png')} className="w-5 h-5" />
//           </View>
//         </View>
//         <Text className="text-lg text-purple-700 mt-5 mb-10">Hear, and Tell</Text>
//         <View className="flex-row justify-around w-full mb-20">
//           <TouchableOpacity
//             onPress={playSoundFour}
//             className="bg-purple-100 p-5 rounded-lg w-2/5 items-center"
//             disabled={isPlayingFour}
//           >
//             <Text className="text-lg font-bold text-purple-700 mb-2">Four</Text>
//             <View className="flex-row items-center w-4/5 h-1 bg-gray-300 rounded">
//               {isPlayingFour ? (
//                 <Image source={require('./assets/pause.png')} className="w-5 h-5 mr-2" />
//               ) : (
//                 <Image source={require('./assets/play.png')} className="w-5 h-5 mr-2" />
//               )}
//               <View className="flex-1 h-1 bg-purple-700 rounded" />
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={playSoundRoar}
//             className="bg-purple-100 p-5 rounded-lg w-2/5 items-center"
//             disabled={isPlayingRoar}
//           >
//             <Text className="text-lg font-bold text-purple-700 mb-2">Roar</Text>
//             <View className="flex-row items-center w-4/5 h-1 bg-gray-300 rounded">
//               {isPlayingRoar ? (
//                 <Image source={require('./assets/pause.png')} className="w-5 h-5 mr-2" />
//               ) : (
//                 <Image source={require('./assets/play.png')} className="w-5 h-5 mr-2" />
//               )}
//               <View className="flex-1 h-1 bg-purple-700 rounded" />
//             </View>
//           </TouchableOpacity>
//         </View>
//         <View className="mb-20">
//           <TouchableOpacity className="bg-purple-700 p-5 rounded-full">
//             <Image source={require('./assets/microphone.png')} className="w-8 h-8" />
//           </TouchableOpacity>
//         </View>
//         <View className="flex-row justify-around w-full absolute bottom-5 px-5">
//           <TouchableOpacity className="items-center">
//             <Image source={require('./assets/dashboard.png')} className="w-6 h-6 mb-1" />
//             <Text className="text-xs text-purple-700">Dashboard</Text>
//           </TouchableOpacity>
//           <TouchableOpacity className="items-center">
//             <Image source={require('./assets/tasks.png')} className="w-6 h-6 mb-1" />
//             <Text className="text-xs text-purple-700">Tasks</Text>
//           </TouchableOpacity>
//           <TouchableOpacity className="items-center">
//             <Image source={require('./assets/profile.png')} className="w-6 h-6 mb-1" />
//             <Text className="text-xs text-purple-700">Profile</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </TailwindProvider>
//   );
// };

// export default DiscriminationLevel2;