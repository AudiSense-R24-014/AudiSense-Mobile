import * as React from "react";
import { Stack } from "expo-router";

const ComprehensionLayout = () => {
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

export default ComprehensionLayout;
