import { Tabs } from "expo-router";

const OnboardingLayout = () => {
  return (
    <Tabs screenOptions={{tabBarStyle : {display : "none"}}}>
      <Tabs.Screen
        name="gettingStarted"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="landing"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default OnboardingLayout;