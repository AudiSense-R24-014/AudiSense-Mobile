import { Stack } from "expo-router";
import React from "react";

const LevelsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="taskOnboarding"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="awareness"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="discrimination"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="identification"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="comprehension"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default LevelsLayout;
