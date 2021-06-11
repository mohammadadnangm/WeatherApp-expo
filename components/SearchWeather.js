import React, { useEffect, useState } from "react" ;
import { FontAwesome } from '@expo/vector-icons';
import { BlockQuote, H1, H2, H3, H4, H5, H6 } from '@expo/html-elements';

import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ImageBackground,
} from 'react-native';

const SearchWeather = () => {
    const [city, setCity] = useState(null);
    const [search, setSearch] = useState("Lodhran");
    useEffect( () => {
        const fetchApi= async() => {
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=0f7355525fb49bd57af1f523c7e4a2d5`
            const response = await fetch(url);
            const resjson = await response.json();
            //console.log(resjson);
            setCity(resjson.main);
        }

        fetchApi();
    }, [search] )

    return(
        <>
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>
            <View style={styles.contentContainerStyle}>
            
                <Image source={require('../assets/icon.png')} style={styles.logo} />
            
                        <TextInput
                        type="search"
                        value={search}
                        style={styles.inputField} 
                        onChange= { (event) => {setSearch(event.target.value) } }/>
                {!city ? (
                    <Text>No Data FOund</Text>
                ) : (
                    <View>
                        <View style={styles.info}>
                            <H1>{"\n"}
                            <FontAwesome name="street-view" size={24} color="red" >{search}</FontAwesome>
                            </H1>
                            <H3 style={styles.mainTemp}>
                            {city.temp}°Cel{"\n"}
                            </H3>
                            <H4 style={styles.MinMaxTemp}> Min: {city.temp_min}°Cel Max: {city.temp_max}°Cel</H4>
                            
                        </View>
                        
                    </View>
                )} 
                
            </View>
            <TouchableOpacity style={styles.button}
                      onPress={alert}>
                         <Text style={styles.buttonText}>Go Back</Text>   
                    </TouchableOpacity> 
        </KeyboardAvoidingView> 
        </>
    )
}
export default SearchWeather;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', 
    },
    contentContainerStyle: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 150,
        paddingBottom: 140,
        paddingLeft: 50,
        paddingRight: 50,
        
    },
    inputContainer: {
        width: 100,
        borderColor: 'black',
        borderWidth: 1,
        padding: 1,
        marginTop: 15,
        borderRadius: 4,
    },
    button: {
        position: 'absolute',
        backgroundColor: 'red',
        padding: 10,
        width: 100,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 50,
        marginLeft: 10,
      },
      buttonText: {
        color: 'white',
        textAlign: 'center',
      },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
        marginTop: 80,
    },
    info: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 50,
        paddingRight: 50,
    },
    inputField: {
        width: 200,
        borderColor: "black",
        borderWidth: 1,
        padding: 10,
        marginTop: 20,
        borderRadius: 25,
    },
    mainTemp: {
        fontSize: 20,
        //marginBottom: 20,
    },
    MinMaxTemp: {
        marginTop: 10,
        marginLeft: 20,
    }

});