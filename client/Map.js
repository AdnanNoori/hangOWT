import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import EventModal from './EventModal.js';
import RNLocation from 'react-native-location';

const Map = ({ currentView, userLocation, potentialEvent }) => {

  const [eventModalVisible, setEventModalVisible] = useState(false);

  return (
    <View style={styles.constainer}>
      <MapView
        style={styles.constainer}
        showsUserLocation={true}
        region={{
          latitude: currentView.latitude,
          longitude: currentView.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          coordinate={{ latitude : 37.78525 , longitude : -122.4124 }}
          title={'Hello'}
          description={'World'}
          image={require('../marker.png')}
        >
        </Marker>
        <Marker
          coordinate={{ latitude : userLocation.latitude , longitude : userLocation.longitude }}
          title={'Hello'}
          description={'World'}
          image={require('../marker.png')}
        >
        </Marker>
        {
          potentialEvent?
          <Marker
            coordinate={{ latitude : currentView.latitude , longitude: currentView.longitude }}
            // title={'Event'}
            // description={'Test'}
            onPress={() => setEventModalVisible(true)}
          >
            <Image
              source={require('../potentialEvent.png')}
              style={{width: 30, height: 50}}
            />
          </Marker>
          : null
        }
      </MapView>
      <EventModal
        eventModalVisible={eventModalVisible}
        setEventModalVisible={setEventModalVisible}
      />
    </View>
  );
}

export default Map;

const styles = StyleSheet.create({
  constainer: {
    ...StyleSheet.absoluteFillObject,
  },
});