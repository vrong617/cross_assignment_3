import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  StatusBar,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ImageSourcePropType,
} from 'react-native';
import PagerDots from './PagerDots';

export type Slide = {
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
  ctaText?: string;
  onPress?: () => void;
};

type Props = {
  slides: Slide[];
  autoIntervalMs?: number;
};

export default function WelcomeSlider({slides, autoIntervalMs = 3500}: Props) {
  const {width, height} = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const listRef = useRef<FlatList<Slide>>(null);
  const indexRef = useRef(0);
  indexRef.current = index;

  const viewCfg = useRef({viewAreaCoveragePercentThreshold: 60}).current;
  const onViewableItemsChanged = useRef(({viewableItems}: any) => {
    if (viewableItems?.[0]?.index != null) setIndex(viewableItems[0].index);
  }).current;

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      const next = (indexRef.current + 1) % slides.length;
      listRef.current?.scrollToIndex({index: next, animated: true});
    }, autoIntervalMs);
    return () => clearInterval(id);
  }, [slides.length, autoIntervalMs]);

  const onScrollToIndexFailed = () => {
    setTimeout(() => {
      listRef.current?.scrollToIndex({index: indexRef.current, animated: true});
    }, 50);
  };

  const onMomentumEnd = (_e: NativeSyntheticEvent<NativeScrollEvent>) => {

  };

  return (
    <View style={[styles.root, {width, height}]}>
      <StatusBar barStyle="light-content" />

      <FlatList
        ref={listRef}
        data={slides}
        keyExtractor={(_, i) => String(i)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewCfg}
        onMomentumScrollEnd={onMomentumEnd}
        onScrollToIndexFailed={onScrollToIndexFailed}
        renderItem={({item}) => (
          <View style={{width, height}}>
            <ImageBackground
              source={item.image}
              resizeMode="cover"
              style={[styles.hero, {height: height * 0.62}]}
            />
            <View style={styles.card}>
              <Text style={styles.h1}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>

              {item.ctaText ? (
                <Pressable
                  style={({pressed}) => [styles.cta, pressed && {opacity: 0.9}]}
                  onPress={item.onPress}
                >
                  <Text style={styles.ctaText}>{item.ctaText}</Text>
                </Pressable>
              ) : null}

              <PagerDots total={slides.length} active={index} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const DARK = '#000E19';
const YELLOW = '#FFE61B';
const TEXT = '#ECFFF9';

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#000'},
  hero: {width: '100%'},
  card: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: DARK,
    borderRadius: 24,
    padding: 48,
    paddingLeft: 32,
    paddingRight: 32,
    gap: 16,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 20,
    elevation: 6,
  },
  h1: {
    color: TEXT,
    fontSize: 38,
    lineHeight: 36,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  subtitle: {color: TEXT, fontSize: 12, lineHeight: 20, textAlign: 'center', marginTop: 4},
  cta: {
    marginTop: 6,
    alignSelf: 'center',
    backgroundColor: YELLOW,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 16,
    minWidth: 200,
    alignItems: 'center',
  },
  ctaText: {color: DARK, fontSize: 17, fontWeight: '700'},
});
