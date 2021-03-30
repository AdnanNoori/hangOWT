import RNLocation from 'react-native-location';

module.exports = {

  getUserLocation : (callback) => {
    RNLocation.configure({
      distanceFilter: 5.0
    })

    RNLocation.requestPermission({
      ios: "whenInUse",
      android: {
        detail: "coarse"
      }
    }).then(granted => {
        if (granted) {
          this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
            callback(locations);
          })
        }
      })
  }
}