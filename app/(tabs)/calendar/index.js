import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Calendar } from "react-native-calendars";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import axios from "axios";

const index = () => {
  const today = moment().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(today);
  const [todos, setTodos] = useState([]);
  const fetchCompletedTodos = async () => {
    try {
      const res = await axios.get(
        `http://192.168.0.103:3000/todos/completed/${selectedDate}`
      );
      const completedTodos = res.data.completedTodos || [];
      setTodos(completedTodos);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCompletedTodos();
  }, [selectedDate]);

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: "#7cb9e8" },
        }}
      />
      <View style={{ margin: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            marginVertical: 10,
          }}
        >
          <Text>Complited Tasks</Text>
          <MaterialIcons name="arrow-drop-down" size={24} color="black" />
        </View>
        {todos.map((item, index) => (
          <Pressable
            style={{
              backgroundColor: "#e0e0e0",
              padding: 10,
              borderRadius: 7,
              marginVertical: 10,
            }}
            key={index}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <AntDesign name="checkcircle" size={18} color="green" />
              <Text
                style={{
                  flex: 1,
                  textDecorationLine: "line-through",
                  color: "gray",
                }}
              >
                {item?.title}
              </Text>
              <SimpleLineIcons name="flag" size={20} color="black" />
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
