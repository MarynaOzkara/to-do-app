import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  BottomModal,
  ModalContent,
  ModalTitle,
  SlideAnimation,
} from "react-native-modals";
import axios from "axios";
import moment from "moment";
import { useRouter } from "expo-router";

const index = () => {
  const router = useRouter();
  const today = moment().format("YYYY-MM-DD");
  const [todos, setTodos] = useState([]);
  const [modalVisisble, setModalVisible] = useState(false);
  const [todo, setTodo] = useState("");
  const [category, setCategory] = useState("All");
  const [pendingTodos, setPendingTodos] = useState([]);
  const [complitedTodos, setComplitedTodos] = useState([]);
  const [mark, setMark] = useState(false);
  const suggestions = [
    {
      id: "0",
      todo: "Drink water",
    },
    {
      id: "1",
      todo: "Do excersising",
    },
    {
      id: "2",
      todo: "Go to bed early",
    },
    {
      id: "3",
      todo: "Go shopping",
    },
    {
      id: "4",
      todo: "Finish assignment",
    },
    {
      id: "5",
      todo: "Take brakfast",
    },
  ];

  const addTodo = async () => {
    try {
      const todoData = {
        title: todo,
        category: category,
      };

      axios
        .post(
          "http://192.168.0.103:3000/todos/add/674b8eedb8c00492d73b9c11",
          todoData
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      await getUserTodos();
      setModalVisible(false);
      setTodo("");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserTodos();
  }, [mark, modalVisisble]);
  const getUserTodos = async () => {
    try {
      const res = await axios.get(
        "http://192.168.0.103:3000/todos/get/674b8eedb8c00492d73b9c11"
      );
      const todos = res.data.todos || [];
      // console.log(todos);
      setTodos(todos);
      const pending = todos.filter((todo) => todo.status !== "complited");
      const completed = todos.filter((todo) => todo.status === "complited");
      setPendingTodos(pending);
      setComplitedTodos(completed);
    } catch (error) {
      console.log(error);
    }
  };
  const markTodoAsComplited = async (todoId) => {
    try {
      setMark(true);
      const res = await axios.patch(
        `http://192.168.0.103:3000/todos/${todoId}/complete`
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(complitedTodos);
  // console.log(pendingTodos);
  // console.log(suggestions);
  return (
    <>
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#7cb8e8",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>All</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#7cb8e8",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Work</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#7cb8e8",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            marginRight: "auto",
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Personal</Text>
        </Pressable>
        <Pressable onPress={() => setModalVisible(!modalVisisble)}>
          <MaterialCommunityIcons
            name="plus-circle"
            size={40}
            color="#0007ff"
          />
        </Pressable>
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ padding: 10 }}>
          {todos?.length > 0 ? (
            <View>
              {pendingTodos?.length > 0 && <Text>Tasks to Do! {today}</Text>}
              {pendingTodos.map((item, index) => (
                <Pressable
                  onPress={() => {
                    router?.push({
                      pathname: "/home/info",
                      params: {
                        id: item._id,
                        title: item.title,
                        category: item.category,
                        createdAt: item.createdAt,
                        dueDate: item.dueDate,
                      },
                    });
                  }}
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
                    <Entypo
                      onPress={() => markTodoAsComplited(item._id)}
                      name="circle"
                      size={18}
                      color="black"
                    />
                    <Text style={{ flex: 1 }}>{item?.title}</Text>
                    <SimpleLineIcons name="flag" size={20} color="black" />
                  </View>
                </Pressable>
              ))}
              {complitedTodos?.length > 0 && (
                <View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      margin: 10,
                    }}
                  >
                    <Image
                      style={{ width: 100, height: 100 }}
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/128/6784/6784655.png",
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                      marginVertical: 10,
                    }}
                  >
                    <Text>Complited Tasks</Text>
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={24}
                      color="black"
                    />
                  </View>
                </View>
              )}
              {complitedTodos.map((item, index) => (
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
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 130,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Image
                style={{ width: 200, height: 200, resizeMode: "contain" }}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/2387/2387679.png",
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 15,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                No tasks for today! Add task
              </Text>
              <Pressable
                onPress={() => setModalVisible(!modalVisisble)}
                style={{ marginTop: 15 }}
              >
                <MaterialCommunityIcons
                  name="plus-circle"
                  size={40}
                  color="#0007ff"
                />
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
      <BottomModal
        onHardwareBackPress={() => setModalVisible(!modalVisisble)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalTitle={<ModalTitle title="Add a todo" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        visible={modalVisisble}
        onTouchOutside={() => setModalVisible(!modalVisisble)}
      >
        <ModalContent style={{ width: "100%", height: 400 }}>
          <View
            style={{
              marginVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <TextInput
              value={todo}
              onChangeText={(text) => setTodo(text)}
              placeholder="Input new task"
              style={{
                margin: 10,
                borderColor: "#e0e0e0",
                borderWidth: 1,
                borderRadius: 10,
                flex: 1,
              }}
            />
            <Ionicons
              onPress={() => addTodo()}
              name="send"
              size={24}
              color="#007fff"
            />
          </View>
          <Text>Choose Category</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginVertical: 10,
            }}
          >
            <Pressable
              onPress={() => setCategory("Work")}
              style={{
                width: 100,
                borderColor: "#e0e0e0",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 25,
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ textAlign: "center" }}>Work</Text>
            </Pressable>
            <Pressable
              onPress={() => setCategory("Personal")}
              style={{
                width: 120,
                borderColor: "#e0e0e0",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderWidth: 1,
                borderRadius: 25,
              }}
            >
              <Text style={{ textAlign: "center" }}>Personal</Text>
            </Pressable>
            <Pressable
              onPress={() => setCategory("WishList")}
              style={{
                width: 120,
                borderColor: "#e0e0e0",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderWidth: 1,
                borderRadius: 25,
              }}
            >
              <Text style={{ textAlign: "center" }}>WishList</Text>
            </Pressable>
          </View>
          <Text>Some suggestions</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {suggestions.map((item, index) => {
              <Pressable
                style={{
                  backgroundColor: "#f0f8ff",
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 25,
                }}
                key={index}
              >
                <Text style={{ textAlign: "center" }}>{item.todo}</Text>
              </Pressable>;
            })}
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default index;

const styles = StyleSheet.create({});
