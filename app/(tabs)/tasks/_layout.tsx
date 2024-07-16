import { Stack } from "expo-router";

const LevelsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="allTasks"
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
