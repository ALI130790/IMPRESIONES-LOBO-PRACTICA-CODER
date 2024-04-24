import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CartItem from '../components/CartItem';
import { useSelector } from 'react-redux';

const Cart = () => {

    const { items: CartData, total } = useSelector(state => state.cart.value)

    return (
        <View style={styles.container}>
            <FlatList
                data={CartData}
                keyExtractor={cartItem => cartItem.id}
                renderItem={({ item }) => {
                    return (
                        <CartItem
                            cartItem={item}
                        />
                    )
                }}
            />
            <View style={styles.totalContainer}>
                <Pressable>
                    <Text>
                        Confirmar
                    </Text>
                </Pressable>
                <Text>Total: ${total}</Text>
            </View>
        </View>
    )
}

export default Cart

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flex: 1,
        marginBottom: 120,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})