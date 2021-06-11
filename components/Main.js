import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useHistory } from 'react-router-native';
import * as Location from 'expo-location'
import WeatherInfo from './WeatherInfo'
import UnitsPicker from './UnitsPicker'
import ReloadIcon from './ReloadIcon'
import WeatherDetails from './WeatherDetails'
import { colors } from '../utils/index'

const WEATHER_API_KEY = '0f7355525fb49bd57af1f523c7e4a2d5'
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'
export default function Main() {
    const [errorMessage, setErrorMessage] = useState(null)
    const [currentWeather, setCurrentWeather] = useState(null)
    const [unitsSystem, setUnitsSystem] = useState('metric')
    const history = useHistory();

    const SearchScreen = () => {
        history.push('/SearchWeather');
    }

    useEffect(() => {
        load()
    }, [unitsSystem])

    async function load() {
        setCurrentWeather(null)
        setErrorMessage(null)
        try {
            let { status } = await Location.requestForegroundPermissionsAsync()

            if (status !== 'granted') {
                setErrorMessage('Access to location is needed to run the app')
                return
            }
            const location = await Location.getCurrentPositionAsync()

            const { latitude, longitude } = location.coords

            const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`

            const response = await fetch(weatherUrl)

            const result = await response.json()

            if (response.ok) {
                setCurrentWeather(result)
            } else {
                setErrorMessage(result.message)
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    }
    if (currentWeather) {
        return (
            <View style={styles.container}>
               
                <StatusBar style="auto" />
                <View style={styles.main}>
                  
                    <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem} />
                    <ReloadIcon load={load} />
                    <WeatherInfo currentWeather={currentWeather} />
                    <TouchableOpacity style={styles.button}
                      onPress={SearchScreen}>
                         <Text style={styles.buttonText}>Search City</Text>   
                    </TouchableOpacity>
                </View>
                <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem} />
               
            </View>
        )
    } else if (errorMessage) {
        return (
            <View style={styles.container}>
                <ReloadIcon load={load} />
                <Text style={{ textAlign: 'center' }}>{errorMessage}</Text>
                <StatusBar style="auto" />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
                <StatusBar style="auto" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
      },
    main: {
        justifyContent: 'center',
        flex: 1,
    },
    button: {
      backgroundColor: 'red',
      padding: 10,
      width: 100,
      marginLeft: 131,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 60,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
    },
})
