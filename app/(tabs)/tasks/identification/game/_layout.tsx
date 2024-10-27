
import { Stack } from "expo-router";

const IdentificationGameLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="levelOne"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="levelTwo"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="levelThree"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default IdentificationGameLayout;
