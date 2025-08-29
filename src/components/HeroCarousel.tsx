import React, { useRef, useState } from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  ViewToken,
  LayoutChangeEvent,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { METRICS } from '../constants/metrics';

type Item = { id: string; src: any };
type Props = { items: Item[] };

const IMG_H = 180;

export default function HeroCarousel({ items }: Props) {
  const [index, setIndex] = useState(0);
  const [w, setW] = useState(0);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems?.[0]?.index != null) setIndex(viewableItems[0].index!);
    }
  ).current;
  const viewCfg = useRef({ viewAreaCoveragePercentThreshold: 60 }).current;

  const onLayout = (e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;
    if (width && width !== w) setW(width);
  };

  return (
    <View style={styles.root} onLayout={onLayout}>
      {w > 0 && (
        <>
          <FlatList
            data={items}
            keyExtractor={(i) => i.id}
            horizontal
            pagingEnabled
            snapToInterval={w}
            snapToAlignment="start"
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewCfg}
            renderItem={({ item }) => (
              <View style={{ width: w }}>
                <Image source={item.src} style={{ width: w, height: IMG_H }} resizeMode="cover" />
              </View>
            )}
          />
          <View style={styles.dots}>
            {items.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, i === index ? styles.dotActive : styles.dotInactive]}
              />
            ))}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    borderRadius: METRICS.radius.md,
    overflow: 'hidden',
    marginBottom: METRICS.spacing.xs,
  },
  dots: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: { width: 8, height: 8, borderRadius: 4 },
  dotActive: { backgroundColor: COLORS.yellow },
  dotInactive: { backgroundColor: 'rgba(255,255,255,0.35)' },
});
