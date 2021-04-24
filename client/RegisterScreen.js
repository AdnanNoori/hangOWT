import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import {localIP} from '../config.js';

const RegisterScreen = ({ navigation }) => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const navigateToLogin = () => {
    console.log('hello');
    if (username.length > 3 && password.length > 7) {
      axios.post(`${localIP}/register/`, { username, password })
      .then((userData) => {
        console.log(userData.data)
        // navigation.navigate({ name: 'Map', params: {userData: userData.data }})
      })
      .catch((err) => {
        console.log(err);
      })
    } else {

    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
      <Text>Register</Text>
      <TextInput
        placeholder="Username..."
        style={styles.input}
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        placeholder="Password..."
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />
      <Button title="REGISTER" onPress={navigateToLogin}></Button>
    </View>
  )
}

export default RegisterScreen;

const styles = StyleSheet.create({
  input: {
    height: 30,
    width: 200,
    margin: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});