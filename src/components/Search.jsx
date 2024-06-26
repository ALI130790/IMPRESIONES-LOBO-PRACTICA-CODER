import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import React, { useState } from "react"
import { FontAwesome } from "@expo/vector-icons"
import { FontAwesome5 } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { colors } from "../constants/colors"
import { Feather } from '@expo/vector-icons'

const Search = ({ onSearch = () => { }, error = "", goBack = () => { } }) => {
  const [keyword, setKeyword] = useState("")

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar..."
          value={keyword}
          onChangeText={setKeyword}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
      <Pressable onPress={() => onSearch(keyword)}>
        <Feather name="search" size={24} color="white" />
      </Pressable>
      <Pressable onPress={() => setKeyword("")}>
        <FontAwesome5 name="eraser" size={24} color="white" />
      </Pressable>
      <Pressable onPress={goBack}>
        <AntDesign name="back" size={24} color="white" />
      </Pressable>

    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'start',
    gap: 8,
    width: '60%',
  },
  input: {
    padding: 8,
    fontSize: 18,
    backgroundColor: colors.teal200,
    color: colors.platinum,
    borderRadius: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    fontFamily: 'Josefin'
  }
})