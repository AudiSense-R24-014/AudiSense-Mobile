import { Stack } from "expo-router";
import React from "react";

const GameLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="listen"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="speak"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default GameLayout;
