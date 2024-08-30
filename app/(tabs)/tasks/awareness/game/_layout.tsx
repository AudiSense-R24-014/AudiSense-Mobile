import { Stack } from "expo-router";

const ComprehensionLayout = () => {
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
    </Stack>
  );
};

export default ComprehensionLayout;
