import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/colors';
import { METRICS } from '../constants/metrics';
import AppHeader from '../components/AppHeader';
import IconLabel from '../components/IconLabel';
import { Car } from '../components/CarCard';
import { RootStackParamList } from '../../App';

export type CarDetailsParams = { car: Car };

type CarDetailsRoute = RouteProp<RootStackParamList, 'CarDetails'>;

const IMG_H = 240;

export default function CarDetailsScreen() {
  const route = useRoute<CarDetailsRoute>();
  const car = route.params?.car;

  if (!car) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <AppHeader title="Car details" showBack="auto" />
        <View style={styles.fallback}>
          <Text style={styles.fallbackText}>No car data provided.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
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

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },

  content: { paddingBottom: 24 },

  img: { width: '100%', height: IMG_H },

  card: {
    backgroundColor: COLORS.card,
    margin: METRICS.spacing.lg,
    padding: METRICS.spacing.md,
    borderRadius: METRICS.radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.stroke ?? COLORS.divider,
  },

  title: { color: COLORS.text, fontSize: 18, fontWeight: '800', marginBottom: 6 },

  price: { color: COLORS.yellow, fontSize: 18, fontWeight: '800', marginBottom: 12 },

  divider: { height: 1, backgroundColor: COLORS.divider, marginVertical: 8, marginBottom: 16 },

  row: { flexDirection: 'row', justifyContent: 'space-between' },

  fallback: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: METRICS.spacing.lg },
  fallbackText: { color: COLORS.text, opacity: 0.7, fontSize: 16, textAlign: 'center' },
});
