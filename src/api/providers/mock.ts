import { cars, categories, hero } from '../../data/mock';
import type { Car } from '../../components/CarCard';
import type { Category } from '../../components/CategoryChips';

export const MockProvider = {
  async getCars(): Promise<Car[]> {
    return cars;
  },
  async getCategories(): Promise<Category[]> {
    return categories;
  },
  async getHero(): Promise<{ id: string; src: any }[]> {
    return hero;
  },
  async getCarById(id: string): Promise<Car | undefined> {
    return cars.find(c => c.id === id);
  },
};