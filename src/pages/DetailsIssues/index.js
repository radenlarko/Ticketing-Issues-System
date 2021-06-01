import React from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import { IconBack2 } from '../../assets';
import { DetailIssue, HeaderMenu } from '../../components';

const DetailsIssues = ({ route, navigation }) => {
  const { item } = route.params;
  const title = item.title;
  const description = item.description;
  const assigned_to = item.assigned_to;
  const categories_id = item.categories_id;
  const priorities_id = item.priorities_id;
  const statuses_id = item.statuses_id;
  const createdAt = item.createdAt;

  // ========== Formate date manual ===========
  // function formatDate(string) {
  //   let options = { year: 'numeric', day: 'numeric', month: 'long', };
  //   return new Date(string).toLocaleDateString([], options);
  // }
  // console.log(formatDate(createdAt));

  const newDate = moment(createdAt).format('llll');

  let assigned;
  if (assigned_to == 1) {
    assigned = 'Rian Pambudi';
  } else if (assigned_to == 2) {
    assigned = 'Admin';
  } else {
    assigned = 'Yos Sularko';
  }

  let category;
  if (categories_id == 1) {
    category = 'Documentation';
  } else if (categories_id == 2) {
    category = 'Hardware Problem';
  } else if (categories_id == 3) {
    category = 'Network Problem';
  } else if (categories_id == 4) {
    category = 'Question';
  } else {
    category = 'Software Problem';
  }

  let priority;
  if (priorities_id == 1) {
    priority = 'High';
  } else if (priorities_id == 2) {
    priority = 'Medium';
  } else {
    priority = 'Low';
  }

  let status;
  if (statuses_id == 1) {
    status = 'New';
  } else if (statuses_id == 2) {
    status = 'Assigned';
  } else if (statuses_id == 3) {
    status = 'Resolved';
  } else {
    status = 'Closed';
  }

  return (
    <>
      <HeaderMenu
        leftButton={<IconBack2 />}
        leftButtonNav={() => navigation.goBack()}
      />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Detail Issues</Text>
        <View style={styles.card}>
          <Text style={styles.titleCard}>{title}</Text>
          <DetailIssue
            label="Description"
            value={description}
            style={{ fontSize: 14 }}
          />
          <DetailIssue label="Assigned to" value={assigned} />
          <DetailIssue label="Category" value={category} />
          <DetailIssue label="Priority" value={priority} />
          <DetailIssue label="Status" value={status} />
          <DetailIssue label="Created at" value={newDate} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.commentTitle}>Comments</Text>
          <View style={styles.commentHeader}>
            <View style={{ width: ScreenWidth * 0.25 }}>
              <Text style={styles.commentHeaderTitle}>PERSON</Text>
            </View>
            <View style={{ width: ScreenWidth * 0.53 }}>
              <Text style={styles.commentHeaderTitle}>COMMENTS</Text>
            </View>
          </View>
          <View style={styles.commentBody}>
            <View style={{ width: ScreenWidth * 0.25 }}>
              <Text style={[styles.commentBodyText, { fontWeight: 'bold' }]}>
                Admin
              </Text>
              <Text style={[styles.commentBodyText, { fontSize: 9 }]}>
                20-08-2020
              </Text>
            </View>
            <View style={{ width: ScreenWidth * 0.53 }}>
              <Text style={styles.commentBodyText}>
                Sedang dalam proses pengecekan
              </Text>
            </View>
          </View>
          <View style={styles.commentBody}>
            <View style={{ width: ScreenWidth * 0.25 }}>
              <Text style={[styles.commentBodyText, { fontWeight: 'bold' }]}>
                IT Support
              </Text>
              <Text style={[styles.commentBodyText, { fontSize: 9 }]}>
                20-08-2020
              </Text>
            </View>
            <View style={{ width: ScreenWidth * 0.53 }}>
              <Text style={styles.commentBodyText}>Done.</Text>
            </View>
          </View>
        </View>
        <View style={{ height: 50 }}></View>
      </ScrollView>
    </>
  );
};

export default DetailsIssues;

let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: ScreenWidth * 0.05,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  titleCard: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#055F9D',
    textTransform: 'capitalize',
    marginTop: 10,
    marginBottom: 18,
  },
  commentTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentHeader: {
    flexDirection: 'row',
    height: 45,
    backgroundColor: 'rgba(255, 172, 76, 0.4)',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commentHeaderTitle: {
    fontSize: 11,
    color: '#4D4D4D',
  },
  commentBody: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
  commentBodyText: {
    fontSize: 14,
    color: '#4D4D4D',
  },
});
