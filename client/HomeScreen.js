import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import GooglePlacesInput from './GooglePlacesInput.js';
import Map from './Map.js';
import { getUserLocation } from './helperFunctions/helperFunctions.js';
import { DrawerActions } from '@react-navigation/native';

export default function HomeScreen({navigation, friendsList, eventList, setEventList}) {

  const [currentView, setCurrentView] = useState({latitude: 0, longitude: 0});

  const [userLocation, setUserLocation] = useState({latitude: 0, longitude: 0});

  const [potentialEvent, setPotentialEvent] = useState(false);

  const [potentialEventAddress, setPotentialEventAddress] = useState('');

  // const [eventList, setEventList] = useState([]);

  const updateCurrentView = (location) => {
    setCurrentView({latitude: location.latitude, longitude: location.longitude});
  }

  const resetView = () => {
    setCurrentView({latitude: userLocation.latitude, longitude: userLocation.longitude});
    setPotentialEvent(false);
  }

  const addNewEvent = (newEvent) => {
    eventList.push(newEvent);
    setEventList(eventList);
  }

  useEffect(() => {
    getUserLocation((location) => {
      setUserLocation({latitude: location.coords.latitude, longitude: location.coords.longitude})
      updateCurrentView({latitude: location.coords.latitude, longitude: location.coords.longitude});
    })
  }, [])

  return (
    <View style={styles.constainer}>
      <Map
        potentialEvent={potentialEvent}
        currentView={currentView}
        userLocation={userLocation}
        potentialEventAddress={potentialEventAddress}
        setPotentialEvent={setPotentialEvent}
        addNewEvent={addNewEvent}
        eventList={eventList}
        friendsList={friendsList}
      />
      <View style={styles.resetButton}>
        <Button
          title='Reset'
          onPress={resetView}
        />
      </View>
      <View style={styles.hambugerButton}>
        <Button
          title="Open drawer"
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
      </View>
      <View style={styles.searchInput}>
        <GooglePlacesInput
          currentView={currentView}
          updateCurrentView={updateCurrentView}
          setPotentialEvent={setPotentialEvent}
          setPotentialEventAddress={setPotentialEventAddress}
        />
      </View>
    </View>
  );
};

var screenSize = Dimensions.get('window');

const styles = StyleSheet.create({
  constainer: {
    ...StyleSheet.absoluteFillObject,
  },
  resetButton: {
    position: 'absolute',
    right: 20,
    top: screenSize.height * .08
  },
  searchInput: {
    position: 'absolute',
    width: screenSize.width
  },
  hambugerButton: {
    position: 'absolute',
    left: 20,
    top: screenSize.height * .08
  },
});