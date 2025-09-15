// src/screens/CarDetailsScreen.tsx
import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import IconLabel from '../components/IconLabel';
import { Car } from '../components/CarCard';
import { METRICS } from '../constants/metrics';
import { RootStackParamList } from '../../App';
import { useTheme } from '../theme/ThemeContext';
import type { ThemeColors } from '../theme/palette';

export type CarDetailsParams = { car: Car };
type CarDetailsRoute = RouteProp<RootStackParamList, 'CarDetails'>;

const IMG_H = 240;

export default function CarDetailsScreen() {
  const route = useRoute<CarDetailsRoute>();
  const car = route.params?.car;

  const { colors, theme } = useTheme();
  const isDark = theme === 'dark';
  const styles = useMemo(() => makeStyles(colors), [colors]);

  if (!car) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.bg} />
        <AppHeader title="Car details" showBack="auto" />
        <View style={styles.fallback}>
          <Text style={styles.fallbackText}>No car data provided.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.bg} />
      <AppHeader title={car.title} showBack="auto" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Image source={car.image} style={styles.img} resizeMode="cover" />

        <View style={styles.card}>
          <Text style={styles.title} numberOfLines={2}>{car.title}</Text>
          <Text style={styles.price}>{car.price}</Text>

          <View style={styles.divider} />

          <View style={styles.row}>
            <IconLabel icon="📅" text={`${car.year} y.`} />
            <IconLabel icon="🛞" text={`${car.mileage} km`} />
          </View>
          <View style={[styles.row, { marginTop: 8 }]}>
            <IconLabel icon="⛽️" text={car.engine} />
            <IconLabel icon="⚙️" text={car.transmission} />
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (c: ThemeColors) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: c.bg },

    content: { paddingBottom: 24 },

    img: { width: '100%', height: IMG_H },

    card: {
      backgroundColor: c.surface,
      margin: METRICS.spacing.lg,
      padding: METRICS.spacing.md,
      borderRadius: METRICS.radius.md,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: c.border,
    },

    title: { color: c.onSurface, fontSize: 18, fontWeight: '800', marginBottom: 6 },

    price: { color: c.primary, fontSize: 18, fontWeight: '800', marginBottom: 12 },

    divider: { height: 1, backgroundColor: c.border, marginVertical: 8, marginBottom: 16 },

    row: { flexDirection: 'row', justifyContent: 'space-between' },

    fallback: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: METRICS.spacing.lg },
    fallbackText: { color: c.onSurface, opacity: 0.7, fontSize: 16, textAlign: 'center' },
  });
