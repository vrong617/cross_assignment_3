import React, { useRef, useState } from 'react';
import { View, FlatList, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { COLORS } from '../constants/colors';
import { METRICS } from '../constants/metrics';

type Item = { id: string; src: any };

type Props = { items: Item[] };

export default function HeroCarousel({ items }: Props) {
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems?.[0]?.index != null) setIndex(viewableItems[0].index);
  }).current;
  const viewCfg = useRef({ viewAreaCoveragePercentThreshold: 60 }).current;

  return (
    <View style={[styles.root, { width }]}>
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <Image source={item.src} style={[styles.img, { width }]} resizeMode="cover" />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewCfg}
      />
      <View style={styles.dots}>
        {items.map((_, i) => (
          <View key={i} style={[styles.dot, i === index ? styles.dotActive : styles.dotInactive]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { borderRadius: METRICS.radius.xl, overflow: 'hidden' },
  img: { height: 180 },
  dots: { position: 'absolute', bottom: 10, alignSelf: 'center', flexDirection: 'row', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  dotActive: { backgroundColor: COLORS.yellow },
  dotInactive: { backgroundColor: 'rgba(255,255,255,0.35)' },
});
