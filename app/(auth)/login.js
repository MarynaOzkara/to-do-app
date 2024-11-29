import {
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

const login = () => {
  const [emal, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
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
            Login to your account
          </Text>
        </View>
        <View style={{ marginTop: 70 }}>
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
              value={emal}
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 12,
              justifyContent: "space-between",
            }}
          >
            <Text>Keep me logged in</Text>
            <Text style={{ color: "#007fff", fontWeight: "500" }}>
              Forgot password
            </Text>
          </View>
          <View style={{ marginTop: 60 }} />
          <Pressable
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
              Login
            </Text>
          </Pressable>
          <View style={{ marginTop: 15 }}>
            <Text style={{ textAlign: "center", fontSize: 15, color: "gray" }}>
              Don't have an account?
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
              onPress={() => router.replace("/register")}
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
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({});
