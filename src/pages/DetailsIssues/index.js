import React from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const DetailsIssues = ({route, navigation}) => {
  const {item} = route.params;
  const title = item.title;
  const description = item.description;
  const assigned_to = item.assigned_to;
  const categories_id = item.categories_id;
  const priorities_id = item.priorities_id;
  const statuses_id = item.statuses_id;
  const createdAt = item.createdAt;

  let assigned;
  if (assigned_to == 1){
    assigned = 'Rian Pambudi'
  } else if (assigned_to == 2){
    assigned = 'Admin'
  } else {
    assigned = 'Yos Sularko'
  }

  let category;
  if (categories_id == 1){
    category = 'Documentation'
  } else if (categories_id == 2){
    category = 'Hardware Problem'
  } else if (categories_id == 3){
    category = 'Network Problem'
  } else if (categories_id == 4){
    category = 'Question'
  } else {
    category = 'Software Problem'
  }

  let priority;
  if (priorities_id == 1){
    priority = 'High'
  } else if (priorities_id == 2){
    priority = 'Medium'
  } else {
    priority = 'Low'
  }

  let status;
  if (statuses_id == 1){
    status = 'New'
  } else if (statuses_id == 2){
    status = 'Assigned'
  } else if (statuses_id == 3){
    status = 'Resolved'
  } else {
    status = 'Closed'
  }

  return (
    <View>
      <Text>Titile: {title}</Text>
      <Text>Description: {description}</Text>
      <Text>Assigned To: {assigned}</Text>
      <Text>Category: {category}</Text>
      <Text>Priority: {priority}</Text>
      <Text>Status: {status}</Text>
      <Text>Created at: {createdAt}</Text>
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
};


export default DetailsIssues;

const styles = StyleSheet.create({});
