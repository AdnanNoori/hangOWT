import React, { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import {localIP} from '../config.js';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = () => {
    axios.get(`${localIP}/login/`, { params: { username, password } })
      .then((userData) => {
        navigation.navigate({ name: 'Map', params: {userData: userData.data }})
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>HangOWT</Text>
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
      {/* <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity> */}
      <Button title="LOGIN" onPress={loginUser}></Button>
      <Button title="SIGNUP" onPress={() => navigation.navigate('Register')}></Button>
    </View>
  )
}

export default LoginScreen;

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