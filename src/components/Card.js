import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { COLORS, SHADOW } from "../utils";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import axios from "axios";

export default function Card(props) {
  const [checkboxState, setCheckboxState] = useState(false);
  const [updateState, setUpdateState] = useState(false);
  const [newText, setNewText] = useState("");

  function renderUpdate(par1) {
    setUpdateState(true);
    setNewText(par1);
  }

  function handleUpdate(par1, par2, par3) {
    axios
      .patch(
        `https://api.kontenbase.com/query/api/v1/8addf18b-228b-491d-82d6-81506a7120cc/todos/${par2}`,
        {
          notes: par1,
        }
      )
      .then((res) => console.log(res))
      .catch((error) => {
        console.log(error);
      });
    setUpdateState(false);
    par3();
  }

  function handleDelete(par1) {
    setCheckboxState(!checkboxState);

    axios
      .delete(
        `https://api.kontenbase.com/query/api/v1/8addf18b-228b-491d-82d6-81506a7120cc/todos/${par1}`
      )
      .then((res) => {
        console.log(res);
      })
      .catch(() => {
        alert("Error Delete Data");
      });
  }

  return (
    <>
      {checkboxState ? (
        <View style={styles.containerCard}>
          <Text
            style={{
              ...styles.todoText,
              textDecorationLine: checkboxState ? "line-through" : "none",
            }}
            numberOfLines={2}
          >
            {props.text}
          </Text>
        </View>
      ) : (
        <Pressable
          style={styles.containerCard}
          onLongPress={() => renderUpdate(props.text)}
        >
          <BouncyCheckbox
            fillColor={COLORS.primary}
            style={styles.checkbox}
            onPress={() => {
              handleDelete(props._id);
            }}
          />
          {updateState ? (
            <TextInput
              style={{
                ...styles.todoText,
                flex: 1,
              }}
              numberOfLines={2}
              value={newText}
              onChangeText={(text) => setNewText(text)}
              returnKeyType="go"
              onSubmitEditing={() =>
                handleUpdate(newText, props._id, props.refresh)
              }
            />
          ) : (
            <Text
              style={{
                ...styles.todoText,
                textDecorationLine: checkboxState ? "line-through" : "none",
                flex: 1,
              }}
              numberOfLines={2}
            >
              {props.text}
            </Text>
          )}
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  containerCard: {
    ...SHADOW,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 19,
    borderRadius: 15,
    elevation: 12,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    marginBottom: 12,
  },
  todoText: {
    fontSize: 20,
    color: COLORS.text,
  },
  checkbox: {
    height: 26,
    width: 26,
    marginRight: 15,
    color: COLORS.primary,
  },
});
