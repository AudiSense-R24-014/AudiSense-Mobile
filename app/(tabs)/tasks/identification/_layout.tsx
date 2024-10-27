
import { Stack } from "expo-router";

const IdentificationLayout = () => {
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

export default IdentificationLayout;
