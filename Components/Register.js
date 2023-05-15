import React, { useState } from "react";
import { useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
export default function Register({navigation}) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginNavigation = useCallback(() => {
    navigation.navigate("Login")
  },[]);

  const handleSingup = () => useCallback(() => {
    if(name && phoneNumber && password) navigation.navigate("GISFIELDS")
  },[name,phoneNumber,password])

  return (
    <View style={styles.container}>
      <Image
       style={styles.image}
       source={{
        uri:"https://cdn.dribbble.com/users/3771812/screenshots/6829297/digital_gov.jpg?compress=1&resize=800x600&vertical=top"
      }}
      /> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Pleae enter the number."
          placeholderTextColor="#003f5c"
          onChangeText={(phone) => setPhoneNumber(phone)}
        /> 
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Pleae enter your name."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setName(text)}
        /> 
      </View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        /> 
      </View> 
      {/* <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text> 
      </TouchableOpacity>  */}
      <TouchableOpacity style={styles.loginBtn} onPress={handleSingup}>
        <Text style={styles.loginText}>Singup</Text> 
      </TouchableOpacity> 
      <TouchableOpacity style={styles.loginBtn} onPress={handleLoginNavigation}>
        <Text style={styles.loginText}>LOGIN</Text> 
      </TouchableOpacity> 
    </View> 
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 50,
    width: 100,
    height:100

  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    width:"100%"
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});