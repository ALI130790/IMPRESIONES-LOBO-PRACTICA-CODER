import { Pressable, StyleSheet, Text, View, Platform } from "react-native"
import React, { useState, useEffect } from "react"
import InputForm from "../components/inputForm"
import SubmitButton from "../components/submitButton"
import { useSignInMutation } from '../services/authService'
import { setUser } from "../features/User/userSlice"
import { useDispatch } from "react-redux"
import { insertSession } from "../persistence"
import Carousel from "../components/carousel/Carousel"

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const [triggerSignIn, result] = useSignInMutation()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    useEffect(() => {

        if (result?.data && result.isSuccess) {
            (async () => {
                try {
                    if (Platform.OS !== 'web') {
                        const response = await insertSession({
                            email: result.data.email,
                            localId: result.data.localId,
                            token: result.data.idToken,
                        })
                    }
                    dispatch(
                        setUser({
                            email: result.data.email,
                            idToken: result.data.idToken,
                            localId: result.data.localId,
                        })
                    )
                } catch (error) {

                }
            })()
        }
    }, [result])

    const onSubmit = () => {
        triggerSignIn({ email, password })
    }

    return (
        <View style={styles.main}>
            <Carousel />
            <View style={styles.container}>
                <Text style={styles.title}>BIENVENIDO</Text>
                <Text style={styles.title}>Inicia sesión para comenzar</Text>
                <InputForm
                    label={"Email:"}
                    onChange={setEmail}
                    error={""}
                />
                <InputForm
                    label={"Contraseña:"}
                    onChange={setPassword}
                    error={""}
                    isSecure={true}
                />
                <SubmitButton
                    onPress={onSubmit}
                    title="Enviar"
                />
                <Text style={styles.sub}>¿No tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate("Signup")}>
                    <Text style={styles.subLink}>Inscribirse</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    main: {
        width: "100%",
        height: "99%",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: "90%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 13,
        paddingVertical: 10,
        borderRadius: 10,
    },
    title: {
        fontSize: 22,
    },
    sub: {
        fontSize: 18,
        color: "black",
    },
    subLink: {
        fontSize: 16,
        color: "blue",
    },
})