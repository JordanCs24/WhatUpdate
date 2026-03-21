import { Text, StyleSheet, ScrollView } from 'react-native';

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
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Your Updates</Text>
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