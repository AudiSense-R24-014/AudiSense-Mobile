import { Stack } from "expo-router";
import React from "react";

const ComprehensionLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="levels"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default ComprehensionLayout;
