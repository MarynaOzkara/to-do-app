import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";

const info = () => {
  const params = useLocalSearchParams();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 10,
        marginHorizontal: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
        <Entypo name="dots-three-vertical" size={24} color="black" />
      </View>
      <View style={{ marginTop: 5 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>
          Category - {params?.category}
        </Text>
      </View>
      <Text style={{ marginTop: 20, fontSize: 17, fontWeight: "600" }}>
        {params?.title}
      </Text>
      <View style={{ marginTop: 50 }} />
      <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <AntDesign name="plus" size={24} color="#7cb9e8" />
        <Text style={{ color: "#7cb9e8", fontSize: 16, fontWeight: "500" }}>
          Add subtask
        </Text>
      </Pressable>
      <View style={{ marginTop: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <AntDesign name="calendar" size={24} color="black" />
            <Text>Due Date</Text>
          </View>
          <Pressable
            style={{ backgroundColor: "#f0f0f0", padding: 7, borderRadius: 6 }}
          >
            <Text>{params?.dueDate}</Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginTop: 15,
            }}
          >
            <Ionicons name="time-sharp" size={24} color="black" />
            <Text>Time and Remainder</Text>
          </View>
          <Pressable
            style={{ backgroundColor: "#f0f0f0", padding: 7, borderRadius: 6 }}
          >
            <Text>No</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default info;

const styles = StyleSheet.create({});
