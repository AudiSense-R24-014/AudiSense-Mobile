import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons"; // Using Feather icons as an example
import React from "react";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#6C26A6", // Color when tab is focused
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          headerShown: false,
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          headerShown: false,
          title: "Tasks",
          tabBarIcon: ({ color, size }) => (
            <Feather name="check-square" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="users/[id]"
        options={{
          headerShown: false,
          title: "User",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
