import { Stack } from "expo-router";

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
        name="levels"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default LevelsLayout;
