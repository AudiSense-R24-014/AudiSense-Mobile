import { Stack } from "expo-router";

const GameLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="landing"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default GameLayout;
