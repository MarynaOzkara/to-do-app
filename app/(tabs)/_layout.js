import { Tabs } from "expo-router";
import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { color: "#7CB9E8" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome5 name="tasks" size={24} color="#7CB9E8" />
            ) : (
              <FontAwesome5 name="tasks" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          tabBarLabel: "Calendar",
          tabBarLabelStyle: { color: "#7CB9E8" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="calendar-o" size={24} color="#7CB9E8" />
            ) : (
              <FontAwesome name="calendar-o" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: { color: "#7CB9E8" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="user-circle" size={24} color="#7CB9E8" />
            ) : (
              <FontAwesome name="user-circle" size={24} color="black" />
            ),
        }}
      />
    </Tabs>
  );
}
