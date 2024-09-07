import { Stack } from "expo-router";

const AwarenessLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="levels"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="game"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default AwarenessLayout;
