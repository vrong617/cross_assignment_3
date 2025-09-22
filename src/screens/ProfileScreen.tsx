import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Alert, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import { useTheme } from '../theme/ThemeContext';

const TABBAR_H = 90;

export default function ProfileScreen() {
  const { colors, theme, setTheme, toggleTheme } = useTheme();

  const go = (where: string) => {
    Alert.alert('Coming soon', where);
  };

  const styles = makeStyles(colors);

  return (
    <SafeAreaView style={styles.root}>
      <AppHeader title="Profile" showBack />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
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

        {/* Settings list */}
        <View style={styles.list}>
          <Row label="My orders" icon="🧾" onPress={() => go('Orders')} />
          <Row label="Settings" icon="⚙️" onPress={() => go('Settings')} />
          <Row label="Help & Support" icon="❓" onPress={() => go('Support')} />

          <Row
            label="Appearance"
            icon="🌓"
            right={
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, width: 60 }}>
                <Text style={[styles.rowLabel, { opacity: 0.7 }]}>
                  {theme === 'dark' ? 'Dark' : 'Light'}
                </Text>
                <Switch
                  value={theme === 'dark'}
                  onValueChange={(v) => setTheme(v ? 'dark' : 'light')}
                />
              </View>
            }
          />
        </View>

        <View style={{ height: TABBAR_H }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Row({
  label,
  icon,
  onPress,
  right,
}: {
  label: string;
  icon: string;
  onPress?: () => void;
  right?: React.ReactNode;
}) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
      <Text style={styles.rowIcon}>{icon}</Text>
      <Text style={styles.rowLabel}>{label}</Text>
      {right ? right : <Text style={styles.rowArrow}>›</Text>}
    </Pressable>
  );
}

const makeStyles = (c: ReturnType<typeof import('../theme/ThemeContext').useTheme>['colors']) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: c.bg },
    scroll: { padding: 16, paddingBottom: TABBAR_H + 16 },

    card: {
      backgroundColor: c.surface,
      borderRadius: 16,
      padding: 16,
      alignItems: 'center',
      marginBottom: 16,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: c.border,
    },
    avatar: {
      width: 72, height: 72, borderRadius: 36,
      backgroundColor: c.bg + '33',
      alignItems: 'center', justifyContent: 'center',
    },
    avatarEmoji: { fontSize: 32 },
    user: { alignItems: 'center', marginTop: 12, marginBottom: 12 },
    name: { color: c.onSurface, fontSize: 18, fontWeight: '700' },
    sub: { color: c.onSurface, opacity: 0.7, marginTop: 2 },

    primaryBtn: {
      marginTop: 4,
      backgroundColor: c.primary,
      borderRadius: 12,
      paddingVertical: 10,
      paddingHorizontal: 18,
    },
    primaryBtnText: { color: '#fff', fontWeight: '800' },

    list: {
      backgroundColor: c.surface,
      borderRadius: 16,
      overflow: 'hidden',
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: c.border,
    },

    row: {
      paddingHorizontal: 14,
      paddingVertical: 14,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    rowPressed: { opacity: 0.85 },
    rowIcon: { fontSize: 18, width: 28, textAlign: 'center' },
    rowLabel: { flex: 1, color: c.onSurface, fontSize: 16, fontWeight: '700' },
    rowArrow: { color: c.onSurface, fontSize: 22, opacity: 0.5 },
});