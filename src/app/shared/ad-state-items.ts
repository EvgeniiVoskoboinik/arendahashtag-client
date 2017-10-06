import {AdStateItem} from './redux/interfaces';

export const AD_TYPES: AdStateItem[] = [
  {
    id: 'provideRent',
    tag: '#сдам',
    title: 'Сдам',
  },
  {
    id: 'findRent',
    tag: '#сниму',
    title: 'Сниму',
  },
  {
    id: 'buy',
    tag: '#куплю',
    title: 'Куплю',
  },
  {
    id: 'sell',
    tag: '#продам',
    title: 'Продам',
  },
];

export const PROPERTY_TYPES: AdStateItem[] = [
  {
    id: 'flat',
    tag: '#квартира',
    title: 'Квартира',
  },
  {
    id: 'house',
    tag: '#дом',
    title: 'Дом',
  },
  {
    id: 'room',
    tag: '#комната',
    title: 'Комната',
  },
  {
    id: 'garage',
    tag: '#гараж',
    title: 'Гараж',
  },
  {
    id: 'stead',
    tag: '#участок',
    title: 'Земельный участок',
  },
  {
    id: 'commercial',
    tag: '#коммерческаянедвижимость',
    title: 'Комерческая недвижимость',
  },
];

export const LEASE_TERMS: AdStateItem[] = [
  {
    id: 'longTerm',
    tag: '#надлительныйсрок',
    title: 'На длительный срок',
  },
  {
    id: 'shortTerm',
    tag: '#посуточно',
    title: 'Посуточно',
  },
];

export const ROOMS_COUNT: AdStateItem[] = [
  {
    id: 'nomatter',
    tag: null,
    title: 'Без разницы',
  },
  {
    id: 'studio',
    tag: '#студия',
    title: 'Студия',
  },
  {
    id: '1room',
    tag: '#1комната',
    title: '1 комната',
  },
  {
    id: '2rooms',
    tag: '#2комнаты',
    title: '2 комнаты',
  },
  {
    id: '3rooms',
    tag: '#3комнаты',
    title: '3 комнаты',
  },
  {
    id: '4room',
    tag: '#4комнаты',
    title: '4 комнаты',
  },
  {
    id: '5room',
    tag: '#5комнат',
    title: '5 комнат',
  },
  {
    id: 'manyrooms',
    tag: '#многокомнат',
    title: 'много комнат',
  },
];

export const ADVERTISER_TYPES: AdStateItem[] = [
  {
    id: 'nomatter',
    tag: null,
    title: 'Без разницы',
  },
  {
    id: 'owner',
    tag: '#собственник',
    title: 'Собственник',
  },
  {
    id: 'agency',
    tag: '#агентство',
    title: 'Агентство',
  },
];
