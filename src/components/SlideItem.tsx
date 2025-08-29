import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Pressable, useWindowDimensions, ImageSourcePropType, Platform } from 'react-native';
import { COLORS } from '../constants/colors';
import { METRICS } from '../constants/metrics';

export type SlideItemProps = {
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
  ctaText?: string;
  onPress?: () => void;
  index: number;        // для пейджера зовні, якщо треба
};

export default function SlideItem({ image, title, subtitle, ctaText, onPress }: SlideItemProps) {
  const { height } = useWindowDimensions();
  const heroH = height * 0.62;

  return (
    <View style={{ width: '100%', height }}>
      <ImageBackground source={image} resizeMode="cover" style={[styles.hero, { height: heroH }]} />
      <View style={[styles.card, Platform.OS === 'ios' ? iosShadow : androidShadow]}>
        <Text style={styles.h1}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        {ctaText ? (
          <Pressable style={({ pressed }) => [styles.cta, pressed && { opacity: 0.9 }]} onPress={onPress}>
            <Text style={styles.ctaText}>{ctaText}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const iosShadow = {
  shadowColor: METRICS.shadow?.color,
  shadowOpacity: METRICS.shadow?.opacity,
  shadowRadius: METRICS.shadow?.radius,
  shadowOffset: METRICS.shadow?.offset,
};
const androidShadow = { elevation: (METRICS.shadow as any)?.elevation ?? 0 };

const styles = StyleSheet.create({
  hero: { width: '100%' },
  card: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    backgroundColor: COLORS.dark, borderRadius: METRICS.radius.lg,
    paddingTop: METRICS.spacing.xl, paddingBottom: METRICS.spacing.lg, paddingHorizontal: METRICS.spacing.lg,
    gap: 16,
  },
  h1: {
    color: COLORS.textOnDark, fontSize: 38, lineHeight: 36, fontWeight: '800',
    textAlign: 'center', letterSpacing: -0.3,
  },
  subtitle: { color: COLORS.textOnDark, fontSize: 12, lineHeight: 20, textAlign: 'center', marginTop: 4 },
  cta: {
    marginTop: 6, alignSelf: 'center', backgroundColor: COLORS.yellow,
    paddingVertical: 14, paddingHorizontal: 28, borderRadius: METRICS.radius.md, minWidth: 200, alignItems: 'center',
  },
  ctaText: { color: COLORS.dark, fontSize: 17, fontWeight: '700' },
});
