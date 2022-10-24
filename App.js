import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database';
import { Header, Icon, Input, Button, ListItem} from 'react-native-elements';


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

      let yes = snapshot.exists();

      if (yes) {

      const data = snapshot.val();
      //jos key on null, ongelma -> else- lohkossa
      //asetetaan siinä tapauksessa tyhjä lista
      const keys = Object.keys(data);
   
      setItems(keys.map(key => ({key, ...data[key]})));
      }
        else {
          setItems([]);
        }
    })
  
  }, []);
  

    const saveItem = () => {
    console.log("saveItem functio");
    push(
      ref(database, 'items/'),
      { 'product' : product, 'amount' : amount }
    );
    setProduct('');
    setAmount('');
  }

  const deleteItem = (key) => {
    console.log('delete button');
    console.log(key);
    // tuo funktiokutsun mukana id

    //const itemsRef = ref(database, 'items/');
    const itemsRef = ref(database, `items/${key}`);
    console.log(itemsRef);
    remove(itemsRef);
   
  }
  // tätä en saa millään toimimaan
  const renderItemComponent = ({item}) => (
    
    <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title><Text>{item.product}</Text></ListItem.Title> 
        </ListItem.Content>
      </ListItem>
)
  
  return (
    <View style={styles.container}>
      
    <Header
      leftComponent={{icon: 'menu', color: '#fff'}}
      centerComponent={{ text: 'SHOPPING LIST', style: {color: '#fff'}}}
      rightComponent={{ icon: 'home', color: '#fff'}}
    ></Header>
      <Input
        placeholder='Product' label='PRODUCT'
        onChangeText={text => setProduct(text)}
        value={product}
      ></Input>
      <Input
        placeholder='Amount' label='AMOUNT'
        onChangeText={text => setAmount(text)}
        value={amount}
      ></Input>
      
      <Button
        raised
        icon={{name: 'save', color: 'white'}}
        onPress={saveItem}
        title='SAVE'
      ></Button>

      <FlatList
        data={items}
        keyExtractor={(item) => item.key.toString()}
        renderItem={({item}) => <View><Text>{item.product}, {item.amount} <Icon type="material" name="delete" color="red" onPress={() => deleteItem(item.key)}></Icon></Text></View>}
          
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
