import Geolocation from 'react-native-geolocation-service';

module.exports = {

  getUserLocation : (callback) => {
    Geolocation.getCurrentPosition(
      (position) => {
        callback(position)
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );

  }
}