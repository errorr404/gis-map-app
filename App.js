import React, { useEffect, useState } from 'react';
import MapView, { Circle, Marker, Polygon } from 'react-native-maps';
import * as Location from 'expo-location';
import { Button, StyleSheet, View } from 'react-native';

export default function App() {
  const [region,setRegion]= useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  const [logLatArr,setFinalLatLog] = useState([]);

  const userLocation =  async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log("status-->",status)
    if(status !== 'granted') {
      console.log("error, permission denied")
    }
    let location = await Location.getCurrentPositionAsync({});
    console.log(location.coords)
    setRegion({
      latitude:33.5004686,
      longitude:-111.9027061,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    })
    console.log("location:-->", location.coords.latitude, location.coords.longitude)
  }
  useEffect(() => {
    userLocation()
  },[])

  useEffect(() => {
    const finalRes = [{
      latitude:33.5362475,
      longitude:-111.9267386
    
    },
    {
      latitude:33.5104882,
      longitude:-111.9627875
    
    },
    {
      latitude:33.5004686,
      longitude:-111.9027061
    
    },
    {
      latitude:33.6004986,
      longitude:-111.9026001
    
    }
  
  ];
    
    setFinalLatLog(finalRes)
  },[region]);
  useEffect(() => {
    console.log("regoion-->",region)
  },[region])
  return (
    <View style={styles.container} >
      <MapView style={styles.map} region={region}>

        <Marker onPress={() => alert("clicked marker")} coordinate={region} title="marker" />
        {/* <Circle center={region} radius={100} fillColor="#6F5BDC" strokeColor="#000"/> */}
        <Polygon coordinates={logLatArr}  fillColor="#6F5BDC" strokeColor="#000" />
      </MapView>
      <Button onPress={userLocation} title='Get coordinates'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '90%',
  },
});