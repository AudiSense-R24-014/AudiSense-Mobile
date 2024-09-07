import { Stack } from "expo-router";

const AwarenessGameLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="BasicAwareness"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Ling6Combined"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Ling6Separated"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AwarenessTaskView/[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Ling6AllTaskView/[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Ling6SeparateTaskView/[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default AwarenessGameLayout;
