import { MockProvider } from '../providers/mock';

const Provider = MockProvider;

export const Api = {
  getCars: () => Provider.getCars(),
  getCategories: () => Provider.getCategories(),
  getHero: () => Provider.getHero(),
  getCarById: (id: string) => Provider.getCarById(id),
};
