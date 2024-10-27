import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const useSoundPlayback = (onPlay: () => void, onEnd: () => void) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPlaying) {
      timer = setTimeout(() => {
        setIsPlaying(false);
        setHasEnded(true);
        onEnd();
      }, 10000);
      onPlay();
    } else {
      setHasEnded(false);
    }

    return () => clearTimeout(timer);
  }, [isPlaying, onPlay, onEnd]);

  return {
    isPlaying,
    hasEnded,
    play: () => {
      setIsPlaying(true);
      setHasEnded(false);
    },
    pause: () => setIsPlaying(false),
    replay: () => {
      setIsPlaying(true);
      setHasEnded(false);
    },
  };
};

const PlaybackBar = ({ onPlay, onEnd }: { onPlay: () => void; onEnd: () => void }) => {
  const { isPlaying, hasEnded, play, pause, replay } = useSoundPlayback(onPlay, onEnd);
  const waveHeight = new Animated.Value(1);

  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(waveHeight, {
            toValue: 5,
            duration: 400,
            useNativeDriver: false,
          }),
          Animated.timing(waveHeight, {
            toValue: 1,
            duration: 400,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      waveHeight.setValue(1);
    }
  }, [isPlaying]);

  return (
    <View className="flex-7 justify-center items-center mt-4">
      <View className="flex flex-row items-center justify-between w-80 p-3 bg-white rounded-full shadow-md">
        {/* Play/Pause Button */}
        <TouchableOpacity 
          onPress={isPlaying ? pause : play} 
          className="flex items-center justify-center w-12 h-12 bg-purple-200 rounded-full transition duration-200 ease-in-out hover:bg-purple-300"
        >
          <FontAwesome 
            name={isPlaying ? "pause" : "play"} 
            size={20} 
            color="#7D4AEA" 
          />
        </TouchableOpacity>

        {/* Waveform */}
        <View className="flex-1 mx-6 h-5">
          <View className="flex flex-row items-center space-x-1">
            {Array(35).fill(0).map((_, index) => (
              <Animated.View
                key={index}
                style={{
                  backgroundColor: isPlaying ? '#7D4AEA' : '#D3D3D3', 
                  height: isPlaying
                    ? waveHeight.interpolate({
                        inputRange: [1, 5],
                        outputRange: [index % 2 === 0 ? 10 : 20, index % 2 === 0 ? 15 : 30],
                      })
                    : index % 2 === 0 ? 10 : 20,
                  width: 2,
                  borderRadius: 2,
                }}
              />
            ))}
          </View>
        </View>

        {/* Replay Button (Visible only after sound ends) */}
        {hasEnded && (
          <TouchableOpacity 
            onPress={replay} 
            className="flex items-center justify-center w-12 h-12 bg-purple-200 rounded-full transition duration-200 ease-in-out hover:bg-purple-300"
          >
            <FontAwesome 
              name="repeat" 
              size={20} 
              color="#7D4AEA" 
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default PlaybackBar;
