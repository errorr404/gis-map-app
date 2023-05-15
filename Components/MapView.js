import React, { useCallback, useEffect, useMemo, useState } from 'react';
import MapView, { Circle, Marker, Polygon } from 'react-native-maps';
import * as Location from 'expo-location';
import { Button, StyleSheet, View } from 'react-native';
import Comment from './comment';

const TYPE = {
  MARKER:"MARKER",
  CIRCLE:"CIRCLE",
  POLYGON:"POLYGON"
}

const elementsType = [
  {
    type:TYPE.MARKER,
    id:"street-light-0",
    latitude:28.451753,
    longitude:77.030546
  },
  {
    type:TYPE.MARKER,
    id:"street-light-1",
    latitude:28.451832, 
    longitude:77.030427
  },
  {
    type:TYPE.MARKER,
    id:"street-light-2",
    latitude:28.451897, 
    longitude:77.029790
  },
  {
    type:TYPE.MARKER,
    id:"street-light-3",
    latitude:28.451974,  
    longitude:77.029210,
  },
  {
    type:TYPE.MARKER,
    id:"street-light-4",
    latitude:28.452063, 
    longitude:77.028731
  }
  ,{
    // type:TYPE.CIRCLE,
    // id:"circle"
  },{
    type:TYPE.POLYGON,
    id:"polygon"
  }
]

export default function FieldMapView() {
  const [region,setRegion]= useState({
    latitude: 28.445860,
    longitude: 77.034230,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  const [logLatArr,setFinalLatLog] = useState([]);
  const [openModal,setOpenModal] = useState(false);
  const [currentSelectedId,setCurrentSelectedId] = useState('')

  const userLocation =  async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted') {
      console.log("error, permission denied")
    }
    let location = await Location.getCurrentPositionAsync({});
    console.log(location.coords)
    setRegion({
      latitude:location.coords.latitude,
      longitude:location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    })
    console.log("location:-->", location.coords.latitude, location.coords.longitude)
  }
  useEffect(() => {
    // userLocation()
  },[])

  useEffect(() => {
    const finalRes = [
      {
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

  const handleMarketPress = (id) => {
    setCurrentSelectedId(id)
    setOpenModal(openModal => !openModal)
  }

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentSelectedId(undefined)
  }


  const getRenderer = useCallback((el) => {
    const {type, longitude, latitude,id} = el;
    let tempLocation = {...region};
    if(longitude && latitude) tempLocation = {...tempLocation, longitude, latitude}
    switch(type) {
      case TYPE.MARKER:
        return   <Marker
        //  image={{uri:"https://i.ibb.co/GpqVX6h/street-light.png"}} 
        //   style={{width: 10, height: 10,}}
           key={id} onPress={() => handleMarketPress(id)} coordinate={tempLocation} title="marker" />;
      case TYPE.CIRCLE:
        // return <Circle key={id} center={tempLocation} radius={10000} fillColor="#6F5BDC" strokeColor="#000"/>;
      // case TYPE.POLYGON: 
      //   return <Polygon key={id} coordinates={logLatArr}  fillColor="#6F5BDC" strokeColor="#000" />
    }
  },[region]);
  return (
    <View style={styles.container} >
     {openModal && <Comment open={openModal} onCloseModal={handleCloseModal} id={currentSelectedId} />}
      <MapView style={styles.map} region={region}>
        {
          elementsType.map((el) =>getRenderer(el))
        }
       
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