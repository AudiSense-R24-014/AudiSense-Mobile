import { Stack } from "expo-router";

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
