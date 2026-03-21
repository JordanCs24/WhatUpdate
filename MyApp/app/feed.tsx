import { Text, StyleSheet, ScrollView, View, TouchableOpacity, } from 'react-native';
import { useState } from 'react';

const UPDATES = [
  {
    id: '1',
    game: 'Fortnite',
    image: '#1a6b9a',
    updates: {
      newContent: ['New weapon: Plasma Rifle', 'New map location: Crystal Cave'],
      bugFixes: ['Fixed shotgun spread bug', 'Fixed crash on lobby screen'],
      balanceChanges: ['SMG damage reduced by 10%', 'Shield potion cooldown increased'],
    }
  },
  {
    id: '2',
    game: 'Warzone',
    image: '#7a3b1e',
    updates: {
      newContent: ['New operator skin: Ghost Recon', 'New game mode: Resurgence'],
      bugFixes: ['Fixed parachute clipping bug'],
      balanceChanges: ['Sniper rifle bullet velocity increased'],
    }
  },
  {
    id: '3',
    game: 'Apex Legends',
    image: '#8b0000',
    updates: {
      newContent: ['New legend: Spectre', 'New care package weapon'],
      bugFixes: ['Fixed Wraith hitbox issue', 'Fixed audio bug in Kings Canyon'],
      balanceChanges: ['Caustic gas damage increased', 'Wingman headshot multiplier reduced'],
    }
  },
];

export default function FeedScreen() {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleCard = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
    };
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Your Updates</Text>

      {UPDATES.map(item => (
        <View key={item.id} style={styles.card}>
          
          {/* Game banner */}
          <TouchableOpacity onPress={() => toggleCard(item.id)}>
            <View style={[styles.banner, { backgroundColor: item.image }]}>
              <Text style={styles.gameName}>{item.game}</Text>
              <Text style={styles.arrow}>{expandedId === item.id ? '▲' : '▼'}</Text>
            </View>
          </TouchableOpacity>

          {/* Collapsible updates */}
          {expandedId === item.id && (
            <View style={styles.updates}>
              <Text style={styles.categoryTitle}>🆕 New Content</Text>
              {item.updates.newContent.map((update, index) => (
                <Text key={index} style={styles.updateItem}>• {update}</Text>
              ))}

              <Text style={styles.categoryTitle}>🐛 Bug Fixes</Text>
              {item.updates.bugFixes.map((update, index) => (
                <Text key={index} style={styles.updateItem}>• {update}</Text>
              ))}

              <Text style={styles.categoryTitle}>⚖️ Balance Changes</Text>
              {item.updates.balanceChanges.map((update, index) => (
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