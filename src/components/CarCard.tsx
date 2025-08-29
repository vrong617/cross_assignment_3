import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';
import { METRICS } from '../constants/metrics';
import IconLabel from './IconLabel';

export type Car = {
  id: string;
  title: string;
  price: string;
  year: string;
  mileage: string;
  engine: string;   // e.g. "Gas 2.4"
  transmission: string; // e.g. "Automat"
  image: any;
};

type Props = { item: Car; onPress?: (id: string) => void };

export default function CarCard({ item, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress?.(item.id)}>
      <Image source={item.image} style={styles.img} resizeMode="cover" />
      <View style={styles.body}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.price}</Text>

        <View style={styles.divider} />

        <View style={styles.specs}>
          <IconLabel icon="📅" text={`${item.year} y.`} />
          <IconLabel icon="🛞" text={`${item.mileage} km`} />
        </View>
        <View style={[styles.specs, { marginTop: 8 }]}>
          <IconLabel icon="⛽️" text={item.engine} />
          <IconLabel icon="⚙️" text={item.transmission} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const IMG_H = 180;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: METRICS.radius.xl,
    marginHorizontal: METRICS.spacing.lg,
    marginBottom: METRICS.spacing.lg,
    overflow: 'hidden',
  },
  img: { width: '100%', height: IMG_H },
  body: { padding: METRICS.spacing.lg },
  title: { color: COLORS.text, fontSize: 16, fontWeight: '700', marginBottom: 6 },
  price: { color: COLORS.yellow, fontSize: 16, fontWeight: '800', marginBottom: 10 },
  divider: { height: 1, backgroundColor: COLORS.divider, marginVertical: 6 },
  specs: { flexDirection: 'row', justifyContent: 'space-between' },
});
