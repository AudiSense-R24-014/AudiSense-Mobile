import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// Define a custom hook for sound playback management
const useSoundPlayback = (onPlay: () => void) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout; // Explicitly type the timer variable

    if (isPlaying) {
      timer = setTimeout(() => {
        setIsPlaying(false);
        setHasEnded(true);
      }, 5000); // Simulating a 5-second playback
      onPlay(); // Call the onPlay function when sound starts playing
    } else {
      setHasEnded(false);
    }

    return () => clearTimeout(timer); // Clean up the timer
  }, [isPlaying, onPlay]);

  return {
    isPlaying,
    hasEnded,
    play: () => setIsPlaying(true),
    pause: () => setIsPlaying(false),
    replay: () => {
      setIsPlaying(true);
      setHasEnded(false);
    },
  };
};

const PlaybackBar = ({ onPlay }: { onPlay: () => void }) => {
  const { isPlaying, hasEnded, play, pause, replay } = useSoundPlayback(onPlay);

  return (
    <View className="flex-7 justify-center items-center mt-4">
      <View className="flex flex-row items-center justify-between w-80 p-3 bg-white rounded-full shadow-md">
        {/* Play/Pause Button */}
        <TouchableOpacity 
          onPress={isPlaying ? pause : play} 
          className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full"
        >
          <FontAwesome 
            name={isPlaying ? "pause" : "play"} 
            size={16} 
            color="#7D4AEA" 
          />
        </TouchableOpacity>

        {/* Waveform */}
        <View className="flex-1 mx-4 h-5">
          <View className="flex flex-row items-center space-x-1">
            {Array(10).fill(0).map((_, index) => (
              <View
                key={index}
                className={`bg-gray-400 ${index % 2 === 0 ? 'h-3' : 'h-5'} w-0.5 rounded`}
              />
            ))}
          </View>
        </View>

        {/* Duration */}
        <Text className="text-black text-sm">0:15</Text>

        {/* Replay Button (Visible only after sound ends) */}
        {hasEnded && (
          <TouchableOpacity 
            onPress={replay} 
            className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full"
          >
            <FontAwesome 
              name="repeat" 
              size={16} 
              color="#7D4AEA" 
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default PlaybackBar;
