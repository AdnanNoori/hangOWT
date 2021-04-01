import React, { useState, useEffect } from 'react';
import { Button, View, Text } from 'react-native';

const LoginScreen = ({navigation}) => {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>HangOWT</Text>
      <Button title="Login" onPress={() => navigation.navigate('Map')}></Button>
    </View>
  )
}

export default LoginScreen;