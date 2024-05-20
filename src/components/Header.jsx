import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../constants/colors'
import { useDispatch, useSelector } from 'react-redux'
import SwitchCustom from './SwitchCustom'
import { setDrakMode } from '../features/Global/globalSlice'

const Header = ({ route }) => {

  const dispatch = useDispatch()
  const [isEnabled, setIsEnabled] = useState(false)
  const categorySelected = useSelector(state => state.shop.value.categorySelected)

  const handleTheme = () => {
    setIsEnabled(initialValue => !initialValue)
    dispatch(setDrakMode(!isEnabled))
  }

  const { height, width } = useWindowDimensions()

  return (
    <View style={styles.container}>
      <Text style={width > 360 ? styles.text : styles.textSm}>{route.name}</Text>
      <SwitchCustom
        isEnabled={isEnabled}
        setIsEnabled={handleTheme} />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    backgroundColor: colors.teal900,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 70
  },
  text: {
    color: colors.teal200,
    fontFamily: 'Josefin',
    fontSize: 25
  },
  textSm: {
    color: colors.teal200,
    fontFamily: 'Josefin',
    fontSize: 16
  }
})