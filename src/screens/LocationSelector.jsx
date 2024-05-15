import { StyleSheet, Text, View } from "react-native"
import React, { useEffect, useState } from "react"
import * as Location from "expo-location"
import AddButton from "../components/AddButton"
import MapPreview from "../components/MapPreview"
import { googleMapsApiKey } from "../databases/googleMaps"
import { colors } from "../constants/colors"
import { useGetLocationQuery, usePostLocationMutation } from "../services/shopService"
import { useSelector } from "react-redux"

const LocationSelector = ({ navigation }) => {
    const [location, setLocation] = useState({ latitude: "", longitude: "" })
    const [address, setAddress] = useState("")
    const [error, setError] = useState("")
    const [triggerPostUserLocation, result] = usePostLocationMutation()
    const {localId} = useSelector(state => state.auth.value)

    
    const onConfirmAddress = () => {

        const date = new Date()

        triggerPostUserLocation({
            location: {
                latitude: location.latitude,
                longitude: location.longitude,
                address: address,
                updatedAt: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
            },
            localId: localId
        })
    }

    //Location requested on mount
    useEffect(() => {
        
        //IIFE Function
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync()
    
                if (status === "granted") {
                    let location = await Location.getCurrentPositionAsync({})
                    
                    setLocation({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    })
                }
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    //Reverse geocoding
    useEffect(() => {
        (async () => {
            try {
                if (location.latitude) {
                    const url_reverse_geocode = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${googleMapsApiKey}`;
                    const response = await fetch(url_reverse_geocode);
                    const data = await response.json();
                    console.dir(data);
                    setAddress(data.results[0].formatted_address);
                }
            } catch (error) {
                setError(error.message);
            }
        })();
    }, [location])

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Mi dirección</Text>
            {location ? (
                <>
                    <Text style={styles.text}>
                        Lat: {location.latitude}, long: {location.longitude}.
                    </Text>
                    <MapPreview location={location} />
                    <Text style={styles.address}>
                    Dirección actualizada: {address}
                    </Text>
                    <AddButton
                        onPress={onConfirmAddress}
                        title="Confirmar mi dirección"
                    />
                </>
            ) : (
                <>
                    <View style={styles.noLocationContainer}>
                        <Text>{error}</Text>
                    </View>
                </>
            )}
        </View>
    )
}

export default LocationSelector

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    text: {
        paddingTop: 20,
        fontFamily: "Josefin",
        fontSize: 18,
    },
    noLocationContainer: {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: colors.teal400,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    address: {
        padding: 10,
        fontSize: 16,
    },
})