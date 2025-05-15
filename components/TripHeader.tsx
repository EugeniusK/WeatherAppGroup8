import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TripHeaderProps {
  onEdit: () => void;
}

const TripHeader: React.FC<TripHeaderProps> = ({ onEdit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Ionicons name="diamond" size={24} color="#6B46C1" />
        <Text style={styles.titleText}>Home</Text>
      </View>
      <TouchableOpacity style={styles.editButton} onPress={onEdit}>
        <Text style={styles.editText}>edit cities / dates</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6B46C1', // Purple color from design
    marginLeft: 5,
  },
  editButton: {
    // Style for edit button
  },
  editText: {
    color: '#3066F1', // Blue color from design
    fontSize: 14,
  },
});

export default TripHeader;