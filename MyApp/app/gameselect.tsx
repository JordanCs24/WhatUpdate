import { Text, StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../api_url';

const GAMES = [
  { id: '1', name: 'Fortnite' },
  { id: '2', name: 'Warzone' },
  { id: '3', name: 'Apex Legends' },
  { id: '4', name: 'Valorant' },
  { id: '5', name: 'Minecraft' },
  { id: '6', name: 'Rocket League' },
  {id: '7', name: 'HellDivers'},
  {id: '8', name: 'Grounded'},
  //We'll add some of the backend later
];


export default function GameSelectScreen() {
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  const router = useRouter();

/*
  toggleGame is using the string paramater to find the 
  games based on id then it checks the selectedGames if they actually exist
*/
  const toggleGame = (id: string) => {
    if (selectedGames.includes(id)) {
      setSelectedGames(selectedGames.filter(game => game !== id));
    } else {
      setSelectedGames([...selectedGames, id]);
    }
  };
  const handleContinue = async () => {
  if (selectedGames.length === 0) {
    alert("Please select at least one game!");
    return;
  }

  // Send selected games to the backend
  // Token is included in the header to verify the user's identity
  try{
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/games/save`,{
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ games: selectedGames }),

    });
    const data = await response.json();
    if (response.ok) {
        router.push('/feed');
    } else {
        alert(data.message);
    }
    
  }
   catch (err){ 
    alert('Could not connect to server!');
    }
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Pick Your Games</Text>
      <Text style={styles.subtitle}>Select the games you want updates for</Text>
      
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
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
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
  continueButton: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 2,
    width: 250,
    height: 80,
    justifyContent: 'center',  // ← centers text vertically
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#2b5a54',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 3,
  },
});