import { View, Text, Button, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import FriendItem from './FriendItem.js';

var screenSize = Dimensions.get('window');

const SideMenu = (props) => {
  return (
    <DrawerContentScrollView style={{padding: 10}} {...props}>
      <Text>Friends</Text>
      <ScrollView style={{height: 200}}>
        {
          props.friendsList.map((item) => {
            return (
              <View
                style={ styles.friend }
                key={item.id}
              >
                <Image
                  source={require('../assets/defaultUser.png')}
                  style={{width: screenSize.width * .1, height: screenSize.height * .04, borderRadius: 50, marginRight: 20}}
                ></Image>
                <Text style={styles.title}>{item.title}</Text>
              </View>
            )
          })
        }
      </ScrollView>
      <Text>Events</Text>
      <ScrollView style={{height: 200}}>
        {
          props.eventList.map((event, index) => {
            return (
              <View key={index}>
                <Text style={{ fontWeight: 'bold' }} >
                  {`Title: ${event.title}`}
                </Text>
                <Text>
                  {`Address: ${event.address}`}
                </Text>
                <Text>
                  {`Date/Time: ${event.date}`}
                </Text>
              </View>
            )
          })
        }
      </ScrollView>
      <Text>Add Friend</Text>
      <Text>Notifications</Text>
    </DrawerContentScrollView>
  );
}

export default SideMenu;

const styles = StyleSheet.create({
  friend: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    flexDirection: 'row',
    width: screenSize.width * .6,
    height: screenSize.height * .06,
  },
});