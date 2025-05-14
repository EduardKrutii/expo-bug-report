import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';

import { OneSignal } from 'react-native-onesignal';
import DateTimePicker from '@react-native-community/datetimepicker';

const ONESIGNAL_APP_ID = "YOUR_ONESIGNAL_APP_ID";

export default function App() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    console.log("App started. Attempting to initialize libraries...");

    try {
      console.log("Attempting to initialize OneSignal...");
      if (OneSignal) {
         OneSignal.initialize(ONESIGNAL_APP_ID);
         console.log("OneSignal initialize called.");
      } else {
         console.error("OneSignal object is undefined.");
      }
    } catch (error) {
      console.error("Error during OneSignal attempt:", error);
    }

    console.log("Attempting to use DateTimePicker...");

  }, []);

  const handleDateChange = (event, date) => {
      setShowDatePicker(Platform.OS === 'ios');
      if (date) {
          setSelectedDate(date);
          console.log("Date selected:", date);
      }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Minimal Bug Demo</Text>

      <Text>Status:</Text>
      <Text>Check terminal for native module errors after launch.</Text>

      <Button title="Show DatePicker" onPress={() => setShowDatePicker(true)} />

      {showDatePicker && (
          <DateTimePicker
              testID="dateTimePicker"
              value={selectedDate}
              mode="datetime"
              is24Hour={true}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              minimumDate={new Date()}
          />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
});