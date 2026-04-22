import { Text, StyleSheet, ScrollView, TouchableOpacity, View, TextInput } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../api_url';

export default function GameSelectScreen() {
  const [searchText, setSearchText] = useState('');
  const [selectedGames, setSelectedGames] = useState<{id: string, name: string}[]>([]);
  const router = useRouter();

  const addGame = () => {
    if (searchText.trim() === '') {
      alert('Please enter a game name!');
      return;
    }
    if (selectedGames.find(g => g.name.toLowerCase() === searchText.toLowerCase())) {
      alert('Game already added!');
      return;
    }
    const newGame = { id: String(Date.now()), name: searchText.trim() };
    setSelectedGames([...selectedGames, newGame]);
    setSearchText('');
  };

  const removeGame = (id: string) => {
    setSelectedGames(selectedGames.filter(g => g.id !== id));
  };

  const handleContinue = async () => {
    if (selectedGames.length === 0) {
      alert('Please add at least one game!');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/games/save`, {
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
    } catch (err) {
      alert('Could not connect to server!');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Pick Your Games</Text>
      <Text style={styles.subtitle}>Search and add any game you want updates for</Text>

      {/* Search input */}
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a game..."
          placeholderTextColor="#5c6874"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.addButton} onPress={addGame}>
          <Text style={styles.addButtonText}>ADD</Text>
        </TouchableOpacity>
      </View>

      {/* Selected games list */}
      {selectedGames.length > 0 && (
        <View style={styles.gamesList}>
          <Text style={styles.listTitle}>YOUR GAMES</Text>
          {selectedGames.map(game => (
            <View key={game.id} style={styles.gameItem}>
              <Text style={styles.gameName}>{game.name}</Text>
              <TouchableOpacity onPress={() => removeGame(game.id)}>
                <Text style={styles.removeButton}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.buttonText}>CONTINUE</Text>
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
    marginBottom: 8,
  },
  subtitle: {
    color: '#c0d5e9',
    fontSize: 14,
    marginBottom: 32,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#ffffff',
    fontSize: 15,
  },
  addButton: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#2b5a54',
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: 2,
  },
  gamesList: {
    marginBottom: 24,
  },
  listTitle: {
    color: '#556677',
    fontSize: 11,
    letterSpacing: 3,
    marginBottom: 12,
  },
  gameItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0D1117',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  gameName: {
    color: '#ffffff',
    fontSize: 15,
  },
  removeButton: {
    color: '#FF4455',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 16,
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