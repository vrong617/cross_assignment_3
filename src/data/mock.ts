import type { Category } from '../components/CategoryChips';
import type { Car } from '../components/CarCard';

export const hero = [
  { id: '1', src: require('../assets/img/home1.png') },
  { id: '2', src: require('../assets/img/home2.png') },
  { id: '3', src: require('../assets/img/home3.png') },
];

export const categories: Category[] = [
  { id: 'bmw', title: 'BMW', icon: require('../assets/img/brands/bmw.png') },
  { id: 'audi', title: 'AUDI', icon: require('../assets/img/brands/audi.png') },
  { id: 'vw', title: 'VW', icon: require('../assets/img/brands/vw.png') },
  { id: 'toyota', title: 'TOYOTA', icon: require('../assets/img/brands/toyota.png') },
  { id: 'ford', title: 'FORD', icon: require('../assets/img/brands/ford.png') },
];

export const cars: Car[] = [
  {
    id: 'car1',
    title: 'Volkswagen Tiguan 2020',
    price: '$29 000',
    year: '2020',
    mileage: '24000',
    engine: 'Gas 2.4',
    transmission: 'Automat',
    image: { uri: 'https://i.infocar.ua/i/12/6246/1400x936.jpg' },
  },
  {
    id: 'car2',
    title: 'BMW X5 2019',
    price: '$42 000',
    year: '2019',
    mileage: '35000',
    engine: 'Diesel 3.0',
    transmission: 'Automat',
    image: { uri: 'https://www.bmw.ua/content/dam/bmw/common/all-models/x-series/x5/2021/highlights/bmw-x5-onepager-vc-driving-dynamics.jpg' },
  },
  {
    id: 'car3',
    title: 'Audi Q7 2020',
    price: '$45 000',
    year: '2020',
    mileage: '28000',
    engine: 'Gas 3.0 TFSI',
    transmission: 'Automat',
    image: { uri: 'https://wah.ua/static/content/thumbs/2048*1365/6/de/fnmak6-7565f03bfae62aad4c6cb7bd7bda7de6.jpg' },
  },
  {
    id: 'car4',
    title: 'Toyota Camry 2021',
    price: '$28 500',
    year: '2021',
    mileage: '15000',
    engine: 'Hybrid 2.5',
    transmission: 'Automat',
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU-SMJOo7bhf-EM07Ib3sTLp_VEvY_8kS_VA&s' },
  },
  {
    id: 'car5',
    title: 'Ford Mustang 2019',
    price: '$38 000',
    year: '2019',
    mileage: '22000',
    engine: 'Gas 5.0 V8',
    transmission: 'Manual',
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjhE1-2cRlhfikXxXW2talh6NIBYV8CjMkWg&s' },
  },
  {
    id: 'car6',
    title: 'Toyota RAV4 2019',
    price: '$26 000',
    year: '2019',
    mileage: '40000',
    engine: 'Gas 2.5',
    transmission: 'Automat',
    image: { uri: 'https://www.cstatic-images.com/stock/1170x1170/53/img1779142054-1542649124953.jpg' },
  },
  {
    id: 'car7',
    title: 'Audi A4 2018',
    price: '$22 000',
    year: '2018',
    mileage: '60000',
    engine: 'Gas 2.0',
    transmission: 'Automat',
    image: { uri: 'https://lh5.googleusercontent.com/proxy/ekw-4v1i48z_Uo_AanAAPWLzRsQHbFfSvx-vWuafDrsoRDTmPQ0xX2HEHgBLL6idmsetGbLEV_46FSoHpjbzAxX6V3Qlwf4Kn6fYWh3EIFW24rOPC-Iv30YReao7pvQVySYLnLKMhvf07_U0OHEbkLsVct9g' },
  },
  {
    id: 'car8',
    title: 'Ford Explorer 2020',
    price: '$33 000',
    year: '2020',
    mileage: '30000',
    engine: 'Gas 3.0 EcoBoost',
    transmission: 'Automat',
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScRvpFy4T905CqnFlAo_A1v66Ud6fRW79X1A&s' },
  },
];

