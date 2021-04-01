import { View, Text, Button, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import FriendItem from './FriendItem.js';
import EventItem from './EventItem.js';

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
                <View>
                  <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
                  <Text>{ item.status}</Text>
                </View>
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
              <EventItem key={index} event={event}/>
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
  event: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    flexDirection: 'column',
    width: screenSize.width * .6,
    height: screenSize.height * .08,
  },
});