import React from 'react';
import WelcomeSlider, {Slide} from '../components/WelcomeSlider';

const slides: Slide[] = [
  {
    image: require('../assets/img/home1.png'),
    title: 'Save More on\nEvery Shop',
    subtitle:
      'Compare prices across major stores and split your list automatically to get the lowest total cost — without extra effort.',
    ctaText: 'Get Started',
    onPress: () => {},
  },
  {
    image: require('../assets/img/home2.png'),
    title: 'One List, One Delivery',
    subtitle: 'Shop from multiple vendors in a single app and get everything delivered together - fast, simple, and hassle-free.',
    ctaText: 'Get Started',
    onPress: () => {},
  },
  {
    image: require('../assets/img/home3.png'),
    title: 'Just Say It, We’ll Add It',
    subtitle: 'Use our AI assistant to build your grocery list by voice. Say what you need - we’ll find it, compare it, and add it for you.',
    ctaText: 'Get Started',
    onPress: () => {},
  },
];

export default function WelcomeScreen() {
  return <WelcomeSlider slides={slides} />;
}
