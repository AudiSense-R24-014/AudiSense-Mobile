import { Tabs } from "expo-router";

const OnboardingLayout = () => {
  return (
    <Tabs screenOptions={{ tabBarStyle: { display: "none" } }}>
      <Tabs.Screen
        name="gettingStarted"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          headerShown: true,
          headerTitle: "Login",
          headerTitleAlign: "center",
          headerTintColor: "#6C26A6",
          headerTitleStyle: {
            fontFamily: "Inter_700Bold",
            fontWeight: "800",
            fontSize: 32,
          },
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
