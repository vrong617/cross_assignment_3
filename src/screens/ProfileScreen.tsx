import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/colors';
import AppHeader from '../components/AppHeader';

const TABBAR_H = 90;

export default function ProfileScreen() {
  const go = (where: string) => {
    Alert.alert('Coming soon', where);
  };

  return (
    <SafeAreaView style={styles.root}>
      <AppHeader title="Profile" showBack />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>👤</Text>
          </View>
          <View style={styles.user}>
            <Text style={styles.name}>Guest</Text>
            <Text style={styles.sub}>Sign in to sync your data</Text>
          </View>

          <Pressable style={styles.primaryBtn} onPress={() => go('Sign In')}>
            <Text style={styles.primaryBtnText}>Sign in</Text>
          </Pressable>
        </View>

        <View style={styles.list}>
          <Row label="My orders" icon="🧾" onPress={() => go('Orders')} />
          <Row label="Favorites" icon="❤️" onPress={() => go('Favorites')} />
          <Row label="Settings" icon="⚙️" onPress={() => go('Settings')} />
          <Row label="Help & Support" icon="❓" onPress={() => go('Support')} />
        </View>

        <View style={{ height: TABBAR_H }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Row({ label, icon, onPress }: { label: string; icon: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
      <Text style={styles.rowIcon}>{icon}</Text>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowArrow}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { padding: 16, paddingBottom: TABBAR_H + 16 },

  title: { color: COLORS.text, fontSize: 28, fontWeight: '800', marginBottom: 12 },

  card: {
    backgroundColor: COLORS.text,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: '#ffffff20',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 32 },
  user: { alignItems: 'center', marginTop: 12, marginBottom: 12 },
  name: { color: COLORS.bg, fontSize: 18, fontWeight: '700' },
  sub: { color: COLORS.bg, opacity: 0.7, marginTop: 2 },

  primaryBtn: {
    marginTop: 4,
    backgroundColor: COLORS.bg,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  primaryBtnText: { color: COLORS.text, fontWeight: '800' },

  list: { backgroundColor: COLORS.text, borderRadius: 16, overflow: 'hidden' },

  row: {
    paddingHorizontal: 14, paddingVertical: 14,
    flexDirection: 'row', alignItems: 'center',
  },
  rowPressed: { opacity: 0.85 },
  rowIcon: { fontSize: 18, width: 28, textAlign: 'center' },
  rowLabel: { flex: 1, color: COLORS.bg, fontSize: 16, fontWeight: '700' },
  rowArrow: { color: COLORS.bg, fontSize: 22, opacity: 0.5 },
});
