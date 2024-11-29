import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

import { useRouter } from "expo-router";
import axios from "axios";

const register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const handleRegister = () => {
    const user = { name: name, email: email, password: password };
    axios
      .post("http://localhost:3000/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert("Registration successfull");
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        Alert.alert("Registration failed");
        console.log("Error", err);
      });
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#ffffff", alignItems: "center" }}
    >
      <View style={{ marginTop: 80 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#0066b2" }}>
          TODO LIST TRACKER
        </Text>
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 20 }}>
            Register your account
          </Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              paddingVertical: 5,
              backgroundColor: "#e0e0e0",
              borderRadius: 15,
              marginTop: 20,
            }}
          >
            <AntDesign
              style={{ marginLeft: 10 }}
              name="user"
              size={24}
              color="gray"
            />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: 17,
              }}
              placeholder="Enter your name"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              paddingVertical: 5,
              backgroundColor: "#e0e0e0",
              borderRadius: 15,
              marginTop: 30,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 10 }}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: 17,
              }}
              placeholder="Enter your email"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              paddingVertical: 5,
              backgroundColor: "#e0e0e0",
              borderRadius: 15,
              marginTop: 20,
            }}
          >
            <AntDesign
              style={{ marginLeft: 10 }}
              name="unlock"
              size={24}
              color="gray"
            />
            <TextInput
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: 17,
              }}
              placeholder="Enter your password"
            />
          </View>

          <View style={{ marginTop: 60 }} />
          <Pressable
            onPress={handleRegister}
            style={{
              width: 200,
              backgroundColor: "#6699cc",
              padding: 15,
              borderRadius: 8,
              marginRight: "auto",
              marginLeft: "auto",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: "bold",
                color: "#ffffff",
              }}
            >
              Sign up
            </Text>
          </Pressable>
          <View style={{ marginTop: 15 }}>
            <Text style={{ textAlign: "center", fontSize: 15, color: "gray" }}>
              Already have an account?
            </Text>
            <Pressable
              style={{
                width: 200,
                backgroundColor: "#6699cc",
                padding: 15,
                borderRadius: 8,
                marginTop: 15,
                marginRight: "auto",
                marginLeft: "auto",
              }}
              onPress={() => router.replace("/login")}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#ffffff",
                }}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default register;

const styles = StyleSheet.create({});
