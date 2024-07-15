import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: "Home",
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="users/[id]"
        options={{
          headerTitle: "User Page",
          title: "User",
        }}
      />
      <Tabs.Screen
        name="levels"
        options={{
          headerTitle: "Level Page",
          title: "Levels",
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;