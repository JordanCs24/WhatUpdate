import { Text, StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';

const GAMES = [
  { id: '1', name: 'Fortnite' },
  { id: '2', name: 'Warzone' },
  { id: '3', name: 'Apex Legends' },
  { id: '4', name: 'Valorant' },
  { id: '5', name: 'Minecraft' },
  { id: '6', name: 'Rocket League' },
  {id: '7', name: 'HellDivers'},
  {id: '8', name: 'Grounded'},

];

export default function GameSelectScreen() {
  const [selectedGames, setSelectedGames] = useState([]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Pick Your Games</Text>
      <Text style={styles.subtitle}>Select the games you want updates for</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b5a54',
  },
  content: {
    paddingHorizontal: 28,
    paddingTop: 80,
    paddingBottom: 40,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
  },
});