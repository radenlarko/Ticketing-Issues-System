import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../../components/AuthContext';
import { HeaderMenu, MyButton } from '../../components';
import { IconAddBlue, IconBack2 } from '../../assets';

const AddIssues = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assign_to, setAssign_to] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const status = 1;

  const [validasi, setValidasi] = useState({
    isValidTitle: true,
    isValidDescription: true,
  });

  const [loading, setLoading] = useState(false);

  const authContext = useContext(AuthContext);

  const handleValidTitle = (value) => {
    if(value.trim().length >= 10){
      setValidasi({
        ...validasi,
        isValidTitle: true
      })
    } else {
      setValidasi({
        ...validasi,
        isValidTitle: false
      })
    }
  }

  const handleValidDescription = (value) => {
    if(value.trim().length >= 12){
      setValidasi({
        ...validasi,
        isValidDescription: true
      })
    } else {
      setValidasi({
        ...validasi,
        isValidDescription: false
      })
    }
  }

  const endpoint = 'http://127.0.0.1:8000/api';
  const saveData = async () => {
    if (!title || !description || !assign_to || !category || !priority) {
      Alert.alert('Wrong Input!', 'Field cannot be empty!!', [{ text: 'Ok' }]);
      setLoading(false);

      return null;
    }

    if (title.trim().length <= 10) {
      Alert.alert('Title Error!!', 'Title minimum 10 characters long.');
      setLoading(false);

      return null;
    }

    if (description.trim().length <= 11) {
      Alert.alert('Description Error!!', 'Description minimum 12 characters long.');
      setLoading(false);

      return null;
    }

    console.log('title: ', title)
    console.log('description: ', description)
    let newToken = await authContext.userToken;
    setLoading(true);

    const dataPost = {
      tickets: {
        title: title,
        description: description,
        assigned_to: parseInt(assign_to),
        categories_id: parseInt(category),
        priorities_id: parseInt(priority),
        statuses_id: status,
      },
    };
    try {
      const request = await fetch(`${endpoint}/tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `token ${newToken}`,
        },
        body: JSON.stringify(dataPost)
      })

      const data = await request.json();
      setLoading(false);
      console.log('Berhasil Post: ', data.ticket.title);
      setTitle('');
      setDescription('');
      setAssign_to('');
      setCategory('');
      setPriority('');
      navigation.navigate('Issues')
    } catch (error) {
      Alert.alert('Error!', String(error), [{ text: 'Ok' }]);
      setLoading(false);
      console.log(error);
    }
    console.log('AddIssues Token: ', newToken);
  };
  return (
    <>
      <HeaderMenu 
        leftButton = {<IconBack2 />}
        leftButtonNav = {() => navigation.navigate('Issues', { screen: 'Issues' })}
        rightButton = {<IconAddBlue />}
        rightButtonNav = {() => navigation.navigate('Home')}
      />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Add Issues</Text>
        <TextInput
          placeholder={'enter title'}
          value={title}
          onChangeText={(value) => {
            setTitle(value)
            handleValidTitle(value)
            }}
          style={styles.textInput}
          maxLength={30}
        />
        {validasi.isValidTitle ? null : (
          <View>
            <Text style={styles.errMsg}>Title minimum 10 characters long.</Text>
          </View>
        )}
        <TextInput
          placeholder={'enter description'}
          value={description}
          onChangeText={(value) => {
            setDescription(value)
            handleValidDescription(value)
            }}
          style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
          multiline
          numberOfLines={4}
          maxLength={140}
        />
        {validasi.isValidDescription ? null : (
          <View>
            <Text style={styles.errMsg}>Description minimum 12 characters long.</Text>
          </View>
        )}
        <Picker
          selectedValue={assign_to}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setAssign_to(itemValue)}>
          <Picker.Item
            label="Select assign to"
            style={{ color: 'grey', fontSize: 14 }}
            value=""
          />
          <Picker.Item label="Rian Pambudi" value="1" />
          <Picker.Item label="admin" value="2" />
          <Picker.Item label="Yos Sularko" value="3" />
        </Picker>
        <View style={styles.line}></View>
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
          <Picker.Item
            label="Select category"
            style={{ color: 'grey', fontSize: 14 }}
            value=""
          />
          <Picker.Item label="Documentation" value="1" />
          <Picker.Item label="Hardware Problem" value="2" />
          <Picker.Item label="Network Problem" value="3" />
          <Picker.Item label="Question" value="4" />
          <Picker.Item label="Software Problem" value="5" />
        </Picker>
        <View style={styles.line}></View>
        <Picker
          selectedValue={priority}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setPriority(itemValue)}>
          <Picker.Item
            label="Select priority"
            style={{ color: 'grey', fontSize: 14 }}
            value=""
          />
          <Picker.Item label="High" value="1" />
          <Picker.Item label="Medium" value="2" />
          <Picker.Item label="Low" value="3" />
        </Picker>
        <View style={[styles.line, { marginBottom: 10 }]}></View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 20}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Issues', { screen: 'Issues' })}>
            <Text style={[styles.textButton, {textDecorationLine: 'underline', marginRight: 30}]}>Back</Text>
          </TouchableOpacity>
          <MyButton 
            label={loading ? "Loading..." : "Submit"}
            navigasi={saveData}
          />
        </View>
        <View style={{ marginVertical: 20 }}></View>
      </ScrollView>
    </>
  );
};

export default AddIssues;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  textInput: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  picker: {
    height: 50,
    borderBottomWidth: 0,
    marginVertical: 10,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  errMsg: {
    fontSize: 12,
    color: '#ed0c2a',
    marginLeft: 12,
  },
});
