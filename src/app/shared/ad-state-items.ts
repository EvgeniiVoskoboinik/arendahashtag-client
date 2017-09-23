import {AdStateItem} from './redux/interfaces';

export const AD_TYPES: AdStateItem[] = [
  {
    id: 'findRent',
    title: 'Сниму',
  },
  {
    id: 'provideRent',
    title: 'Сдам',
  },
  {
    id: 'buy',
    title: 'Куплю',
  },
  {
    id: 'sell',
    title: 'Продам',
  },
];

export const PROPERTY_TYPES: AdStateItem[] = [
  {
    id: 'flat',
    title: 'Квартира',
  },
  {
    id: 'house',
    title: 'Дом',
  },
  {
    id: 'room',
    title: 'Комната',
  },
  {
    id: 'garage',
    title: 'Гараж',
  },
  {
    id: 'stead',
    title: 'Земельный участок',
  },
  {
    id: 'commercial',
    title: 'Комерческая недвижимость',
  },
];

export const LEASE_TERMS: AdStateItem[] = [
  {
    id: 'shortTerm',
    title: 'Посуточно',
  },
  {
    id: 'longTerm',
    title: 'На длительный срок',
  },
];

export const ROOMS_COUNT: AdStateItem[] = [
  {
    id: '0',
    title: 'Студия',
  },
  {
    id: '1',
    title: '1-комнатная',
  },
  {
    id: '2',
    title: '2-комнатная',
  },
  {
    id: '3',
    title: '3-комнатная',
  },
  {
    id: '4',
    title: '4-комнатная',
  },
  {
    id: '5',
    title: '5-комнатная',
  },
  {
    id: '6',
    title: 'многокомнатная',
  },
];

export const ADVERTISER_TYPES: AdStateItem[] = [
  {
    id: 'owner',
    title: 'Собственник',
  },
  {
    id: 'agency',
    title: 'Агентство',
  },
];

export const CITIES: AdStateItem[] = [
  'Москва',
  'Санкт-Петербург',
  'Астрахань',
  'Барнаул',
  'Волгоград',
  'Воронеж',
  'Екатеринбург',
  'Ижевск',
  'Иркутск',
  'Казань',
  'Калининград',
  'Краснодар',
  'Красноярск',
  'Набережные Челны',
  'Нижний Новгород',
  'Новосибирск',
  'Омск',
  'Оренбург',
  'Пермь',
  'Ростов-на-Дону',
  'Самара',
  'Саратов',
  'Ставрополь',
  'Тольятти',
  'Тула',
  'Тюмень',
  'Ульяновск',
  'Уфа',
  'Челябинск',
  'Ярославль',
].map((city: string, index: number) => {
  return {
    id: index.toString(),
    title: city,
  };
});
