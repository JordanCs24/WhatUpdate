import { Text, StyleSheet, ScrollView, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../api_url';

export default function FeedScreen() {
  const [userGames, setUserGames] = useState<{id: string, name: string}[]>([]);
  const [updates, setUpdates] = useState<{[key: string]: any}>({});
  const [loadingGames, setLoadingGames] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchUserGames = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/games`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setUserGames(data.games);
      }
    } catch (err) {
      alert('Could not connect to server!');
    } finally {
      setLoadingGames(false);
    }
  };

  const fetchGameUpdate = async (game: {id: string, name: string}) => {
    // If already loaded don't fetch again
    if (updates[game.id]) return;

    setLoadingUpdate(game.id);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/updates/fetch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ games: [game] }),
      });
      const data = await response.json();
      if (response.ok && data.updates.length > 0) {
        setUpdates(prev => ({ ...prev, [game.id]: data.updates[0] }));
      }
    } catch (err) {
      alert('Could not fetch update!');
    } finally {
      setLoadingUpdate(null);
    }
  };

  const toggleCard = (game: {id: string, name: string}) => {
    if (expandedId === game.id) {
      setExpandedId(null);
    } else {
      setExpandedId(game.id);
      fetchGameUpdate(game);
    }
  };

  useEffect(() => {
    fetchUserGames();
  }, []);

  if (loadingGames) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Your Updates</Text>

      {userGames.map(game => (
        <View key={game.id} style={styles.card}>

          {/* Game banner */}
          <TouchableOpacity onPress={() => toggleCard(game)}>
            <View style={[styles.banner, { backgroundColor: '#1a6b9a' }]}>
              <Text style={styles.gameName}>{game.name}</Text>
              <Text style={styles.arrow}>{expandedId === game.id ? '▲' : '▼'}</Text>
            </View>
          </TouchableOpacity>

          {/* Collapsible updates */}
          {expandedId === game.id && (
            <View style={styles.updates}>
              {loadingUpdate === game.id ? (
                <ActivityIndicator color="#00C878" />
              ) : updates[game.id] ? (
                <>
                  <Text style={styles.categoryTitle}>🆕 New Content</Text>
                  {updates[game.id].summary.newContent.map((update: string, index: number) => (
                    <Text key={index} style={styles.updateItem}>• {update}</Text>
                  ))}

                  <Text style={styles.categoryTitle}>🐛 Bug Fixes</Text>
                  {updates[game.id].summary.bugFixes.map((update: string, index: number) => (
                    <Text key={index} style={styles.updateItem}>• {update}</Text>
                  ))}

                  <Text style={styles.categoryTitle}>⚖️ Balance Changes</Text>
                  {updates[game.id].summary.balanceChanges.map((update: string, index: number) => (
                    <Text key={index} style={styles.updateItem}>• {update}</Text>
                  ))}
                </>
              ) : (
                <Text style={styles.updateItem}>No updates found</Text>
              )}
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