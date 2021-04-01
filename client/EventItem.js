import React, { useState } from "react";
import { Image, FlatList, Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, Dimensions, TouchableOpacity } from "react-native";

import EventDetailModal from './EventDetailModal.js';

var screenSize = Dimensions.get('window');

const EventItem = ({ event, index }) => {

  const [ eventDetailModal, setEventDetailModal ] = useState(false);

  return (
    <Pressable
      key={index}
      style={ styles.event }
      onPress={() => setEventDetailModal(true)}
    >
      <Text style={{ fontWeight: 'bold' }} >
        {`Title: ${event.title}`}
      </Text>
      {/* <Text>
        {`Address: ${event.address}`}
      </Text> */}
      <Text>
        {`Date/Time: ${event.date}`}
      </Text>
      <EventDetailModal
        eventDetailModal={eventDetailModal}
        setEventDetailModal={setEventDetailModal}
        event={event}
      />
    </Pressable>
  );
}

export default EventItem;

const styles = StyleSheet.create({
  event: {
    backgroundColor: 'grey',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    flexDirection: 'column',
    width: screenSize.width * .6,
    height: screenSize.height * .08,
  },
});