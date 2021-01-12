import React from 'react';
import Loading from './Loading';
import { Alert } from 'react-native';
import * as Location from "expo-location";
import axios from 'axios';
import Weather from './Weather';

const API_KEY = "0caaa743b791cd0a8d3b01345cf1fbee";

export default class extends React.Component {
  state = {
    isLoading: true,
  }
  getweather = async (latitude, longitude) => {
    const { data: { main: { temp }, weather } } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`)

    this.setState({ isLoading: false, temp, weather: weather[0].main });
  }
  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();
      this.getweather(latitude, longitude);

    } catch (error) {
      Alert.alert("Can't find you", "So sad")
    }
  }

  componentDidMount() {
    this.getLocation()
  }
  render() {
    const { isLoading, temp, weather } = this.state;
    return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={weather} />;
  }
}
