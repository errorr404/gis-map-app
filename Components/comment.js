import React, { useEffect, useState } from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, View, } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MarketIssue, { MARKER_ISSUES } from './dropdown';

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];


const Comment = (props) => {
    const { open, onCloseModal,id} = props;
    console.log(props)
    const [comments,setCommets] = useState([]);
    const [commentedText,setCommentedText] = useState('')
    const [currentSelectedIssue,setCurrentSelectedIssue] = useState();
    useEffect(() => {
        (async() => {const value = await AsyncStorage.getItem(`@comment-${id}`);
        if(!value) return;
        const parsedValue = JSON.parse(value);
        console.log("id===>",{id,parsedValue})
        setCommets(parsedValue);})();
       
    },[id]);
    const handleComent = async() => {
        if(!commentedText) return;
        if(!currentSelectedIssue) {
            alert("select the issue");
            return;
        }
        const tempComment = [...comments,{issue:currentSelectedIssue, comment:commentedText}];
        try {
            
            setCommets(tempComment)
            setCommentedText('')
            await AsyncStorage.setItem(`@comment-${id}`,JSON.stringify(tempComment))
        } catch (error) {
            console.log("error",error)
        }
    }
    const handleSelectedIssue = issue => {
        setCurrentSelectedIssue(issue)
    }
    return (
        <Modal  
        animationType="slide"
        style={styles.modal}
        visible={open}>
        <View style={styles.container}>
            <Button style={styles.closeButton}  onPress={onCloseModal} title='close'/>
            {
                comments.map(({issue, comment}) => (
                    <View style={styles.commentTextContainer} key={comment} >
                        <Text style={styles.commentIssueText} >issue: {MARKER_ISSUES[issue]}</Text>
                        <Text >comment: {comment}</Text>
                    </View>
                ))
            }
            <View style={styles.commentContainer}>
            <TextInput value={commentedText} style={styles.textField} onChangeText={(text) =>setCommentedText(text)} />
            <View style={styles.commentActions}>
            <MarketIssue onValueChange={handleSelectedIssue} />
            <Button style={styles.commentButton} onPress={handleComent} title='Post comment'/>
            </View>
            </View>
        </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal:{
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: '100%',
        width: '80%'
    },
    commentTextContainer: {
        borderWidth:1,
        borderColor:"#000000",
        borderRadius:2,
        width:"100%",
        marginBottom:5,
        backgroundColor:"#F7F7F7"
    },  
    commentIssueText:{
        color:"#FF0000",
        fontWeight: 500,
    },
    commentText:{
    },
    container:{
        height:"100%"
    },
    closeButton:{
        width:"20%",
        justifyContent:"flex-end"
    },
    commentContainer:{
        flexDirection:"column",
        position:"absolute",
        bottom:10,
        width:"100%",
        height:100,
    },
    commentActions: {
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        height: 50,
    },
    textField:{
        height:40,
        borderColor:"#000000",
        borderWidth:1,
        borderRadius:4,
        width: '100%'
    },
    commentButton:{
        backgroundColor:"red",
        height:30,
    }
});
export default Comment;