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

  const toggleGame = (id: string) => {
    if (selectedGames.includes(id)) {
      setSelectedGames(selectedGames.filter(game => game !== id));
    } else {
      setSelectedGames([selectedGames, id]);
    }
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Pick Your Games</Text>
        <View style={styles.grid}>
      {GAMES.map(game => (
          <TouchableOpacity
            key={game.id}
            style={[styles.card, selectedGames.includes(game.id) && styles.cardSelected]}
            onPress={() => toggleGame(game.id)}
          >
            <Text style={styles.cardText}>{game.name}</Text>
          </TouchableOpacity>
      ))}
  </View>
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
  subtitle: {
    color: '#c0d5e9',
    fontSize: 14,
    marginBottom: 32,
  },grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    backgroundColor: '#0D1117',
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    width: '47%',
    alignItems: 'center',
  },
  cardSelected: {
    backgroundColor: '#2b8a6e',
    borderColor: '#2b8a6e',
  },
  cardText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});