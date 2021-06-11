import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native'
import { NativeRouter, Route } from 'react-router-native';

import Main from './components/Main.js';
import SearchWeather from './components/SearchWeather.js';

function App() {
  return (
    <NativeRouter>
      <Route exact path="/" component={Main} />
      <Route exact path="/searchweather" component={SearchWeather} />

      <StatusBar style="auto" />
    </NativeRouter>
  );
}

export default App;
