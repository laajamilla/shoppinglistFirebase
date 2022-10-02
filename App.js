import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database';

export default function App() {

  
const firebaseConfig = {
  apiKey: "AIzaSyC2eEC8GTaF2GhbEL6dvK4h84hAxWJF_1E",
  authDomain: "shoppinglist-c5340.firebaseapp.com",
  projectId: "shoppinglist-c5340",
  storageBucket: "shoppinglist-c5340.appspot.com",
  messagingSenderId: "233106102894",
  appId: "1:233106102894:web:aed251e822757a193c247f"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

  const [ product, setProduct ] = useState('');
  const [ amount, setAmount ] = useState('');
  const [ items, setItems ] = useState([]);
  

  useEffect(() => {
    const itemsRef = ref(database, 'items/');
    onValue(itemsRef, (snapshot) => {
     // console.log(snapshot);
      const data = snapshot.val();
      //console.log(data);
      //setItems(Object.values(data));
      setItems(data);
     //setItems(Object.keys(data));

    })
  }, []);
  
    console.log(items);

  const saveItem = () => {
    console.log("saveItem functio");
    push(
      ref(database, 'items/'),
      { 'product' : product, 'amount' : amount }
    );
    setProduct('');
    setAmount('');
  }

  const deleteItem = () => {
    console.log('delete button');
    // tuo funktiokutsun mukana id
    // sijoita id oikealle paikalle
    // tarkista, ettei ole jo null -> jos ei ole, poista

    const itemsRef = ref(database, 'items/-NDDuKnoOYmrplPxfW5m');
    console.log(itemsRef);
   // remove(itemsRef);
   
  }


  return (
    <View style={styles.container}>
      <Text>firebase</Text>
      <TextInput
        style={{marginTop:40, fontSize: 18, width: 200, borderColor: 'grey', borderWidth: 1}}
        onChangeText={text => setProduct(text)}
        value={product}
        placeholder='product'
      ></TextInput>
      <TextInput
        style={{marginTop:5, marginBottom: 5, fontSize: 18, width: 200, borderColor: 'grey', borderWidth: 1}}
        onChangeText={text => setAmount(text)}
        value={amount}
        placeholder='amount'
      ></TextInput>
      <Button
        title='save'
        onPress={saveItem}
      ></Button>
      <Button
        title='delete'
        onPress={deleteItem}
      ></Button>

      <FlatList
       
      
      ></FlatList>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
