import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { METRICS } from '../constants/metrics';
import IconLabel from './IconLabel';
import { useTheme } from '../theme/ThemeContext';
import type { ThemeColors } from '../theme/palette';

export type Car = {
  id: string;
  title: string;
  price: string;
  year: string;
  mileage: string;
  engine: string;
  transmission: string;
  image: any;
};

type Props = {
  item: Car;
  onPress?: (id: string) => void;
  containerStyle?: ViewStyle;
};

const IMG_H = 180;

export default function CarCard({ item, onPress, containerStyle }: Props) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);

  return (
    <TouchableOpacity style={[styles.card, containerStyle]} onPress={() => onPress?.(item.id)}>
      <Image source={item.image} style={styles.img} resizeMode="cover" />
      <View style={styles.bodyWrap}>
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
      </View>
    </TouchableOpacity>
  );
}

const makeStyles = (c: ThemeColors) =>
  StyleSheet.create({
    card: {
      backgroundColor: c.surface,
      borderRadius: METRICS.radius.md,
      marginHorizontal: METRICS.spacing.lg,
      marginBottom: METRICS.spacing.md,
      overflow: 'hidden',
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: c.border,
    },
    img: { width: '100%', height: IMG_H },
    bodyWrap: {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: c.border,
      backgroundColor: c.surface,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: METRICS.radius.md,
      borderBottomRightRadius: METRICS.radius.md,
    },
    body: { padding: METRICS.spacing.md },
    title: { color: c.onSurface, fontSize: 16, fontWeight: '700', marginBottom: 6 },
    price: { color: c.primary, fontSize: 16, fontWeight: '800', marginBottom: 10 },
    divider: { height: 1, backgroundColor: c.border, marginVertical: 6, marginBottom: 15 },
    specs: { flexDirection: 'row', justifyContent: 'space-between' },
  });
