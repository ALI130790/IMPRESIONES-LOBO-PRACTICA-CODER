import React from "react"
import { StyleSheet, View } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeStackNavigator from "./HomeStackNavigator"
import { colors } from "../constants/colors"
import CartStack from "./CartSatckNavigator"
import OrderStack from "./OrderStackNavigator"
import Header from "../components/Header"
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"
import MyProfileStackNavigator from "./MyProfileStackNavigator"

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                header: () => {
                    return <Header route={route} />
                },
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
            })}
        >
            <Tab.Screen
                name="CATEGORIAS"
                component={HomeStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <FontAwesome5
                                    name="store"
                                    size={24}
                                    color={focused ? "black" : colors.platinum}
                                />
                            </View>
                        )
                    },
                }}
            />
            <Tab.Screen
                name="CARRITO DE COMPRAS"
                component={CartStack}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <FontAwesome6
                                    name="cart-shopping"
                                    size={24}
                                    color={focused ? "black" : colors.platinum}
                                />
                            </View>
                        )
                    },
                }}
            />
            <Tab.Screen
                name="ORDENES DE COMPRA"
                component={OrderStack}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <Ionicons name="receipt-outline" size={24} color={focused ? 'black' : colors.platinum} />
                            </View>
                        )
                    },
                }}
            />
             <Tab.Screen 
                name="MI PERFIL"
                component={MyProfileStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <Ionicons name="person-circle" size={24} color={ focused ? 'black' : colors.platinum}  />
                            </View>
                        )
                    },
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: colors.teal400,
        shadowColor: "black",
        elevation: 4,
        height: 60,
    },
})