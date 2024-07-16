import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="dashboard"
        options={{
          headerShown: false,
          title: "Dashboard",
        }}
      />
      <Tabs.Screen
        name="users/[id]"
        options={{
          headerShown: false,
          title: "User",
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          headerShown: false,
          title: "Tasks",
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;