import { Text, StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../api_url';
import { GAMES } from '../constants';

export default function FeedScreen() {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [updates, setUpdates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchGames = async () => {
      console.log('fetching games...');
      console.log('API_URL: ', API_URL);
      try {
        const token = await AsyncStorage.getItem('token');
        
        // Step 1: Get user's saved games
        const gamesResponse = await fetch(`${API_URL}/api/games`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const gamesData = await gamesResponse.json();

        if (gamesResponse.ok) {
          // Step 2: Fetch AI summaries for each game
          const gamesList = GAMES.filter(g => gamesData.games.includes(g.id));
          
          const updatesResponse = await fetch(`${API_URL}/api/updates/fetch`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ games: gamesList }),
          });

          const updatesData = await updatesResponse.json();

          if (updatesResponse.ok) {
            setUpdates(updatesData.updates);
          }
        } else {
          alert(gamesData.message);
        }
      } catch (err) {
        alert('Could not connect to server!');
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchGames();
  }, []);

  const toggleCard = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }
    
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Your Updates</Text>

      {updates.map(item => (
        <View key={item._id} style={styles.card}>
          
          {/* Game banner */}
          <TouchableOpacity onPress={() => toggleCard(item._id)}>
            <View style={[styles.banner, { backgroundColor: '#1a6b9a' }]}>
              <Text style={styles.gameName}>{item.gameName}</Text>
              <Text style={styles.arrow}>{expandedId === item._id ? '▲' : '▼'}</Text>
            </View>
          </TouchableOpacity>

          {/* Collapsible updates */}
          {expandedId === item._id && (
            <View style={styles.updates}>
              <Text style={styles.categoryTitle}>🆕 New Content</Text>
              {item.summary.newContent.map((update: string, index: number) => (
                <Text key={index} style={styles.updateItem}>• {update}</Text>
              ))}

              <Text style={styles.categoryTitle}>🐛 Bug Fixes</Text>
              {item.summary.bugFixes.map((update: string, index: number) => (
                <Text key={index} style={styles.updateItem}>• {update}</Text>
              ))}

              <Text style={styles.categoryTitle}>⚖️ Balance Changes</Text>
              {item.summary.balanceChanges.map((update: string, index: number) => (
                <Text key={index} style={styles.updateItem}>• {update}</Text>
              ))}
            </View>
          )}

        </View>
      ))}
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
  card: {
    backgroundColor: '#0D1117',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  banner: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gameName: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  arrow: {
    color: '#ffffff',
    fontSize: 16,
  },
  updates: {
    padding: 16,
  },
  categoryTitle: {
    color: '#00C878',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 12,
    marginBottom: 6,
  },
  updateItem: {
    color: '#c0d5e9',
    fontSize: 13,
    marginBottom: 4,
    lineHeight: 20,
  },
});