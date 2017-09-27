import {AdStateItem} from './redux/interfaces';

export const AD_TYPES: AdStateItem[] = [
  {
    id: 'findRent',
    tag: 'сниму',
    title: 'Сниму',
  },
  {
    id: 'provideRent',
    tag: 'сдам',
    title: 'Сдам',
  },
  {
    id: 'buy',
    tag: 'куплю',
    title: 'Куплю',
  },
  {
    id: 'sell',
    tag: 'продам',
    title: 'Продам',
  },
];

export const PROPERTY_TYPES: AdStateItem[] = [
  {
    id: 'flat',
    tag: 'квартира',
    title: 'Квартира',
  },
  {
    id: 'house',
    tag: 'дом',
    title: 'Дом',
  },
  {
    id: 'room',
    tag: 'комната',
    title: 'Комната',
  },
  {
    id: 'garage',
    tag: 'гараж',
    title: 'Гараж',
  },
  {
    id: 'stead',
    tag: 'участок',
    title: 'Земельный участок',
  },
  {
    id: 'commercial',
    tag: 'коммерческая_недвижимость',
    title: 'Комерческая недвижимость',
  },
];

export const LEASE_TERMS: AdStateItem[] = [
  {
    id: 'shortTerm',
    tag: 'посуточно',
    title: 'Посуточно',
  },
  {
    id: 'longTerm',
    tag: 'на_длительный_срок',
    title: 'На длительный срок',
  },
];

export const ROOMS_COUNT: AdStateItem[] = [
  {
    id: 'no_matter',
    tag: null,
    title: 'Без разницы',
  },
  {
    id: 'studio',
    tag: 'студия',
    title: 'Студия',
  },
  {
    id: '1room',
    tag: '1_комната',
    title: '1 комната',
  },
  {
    id: '2rooms',
    tag: '2_комнаты',
    title: '2 комнаты',
  },
  {
    id: '3rooms',
    tag: '3_комнаты',
    title: '3 комнаты',
  },
  {
    id: '4room',
    tag: '4_комнаты',
    title: '4 комнаты',
  },
  {
    id: '5room',
    tag: '5_комнат',
    title: '5 комнат',
  },
  {
    id: 'many_rooms',
    tag: 'много_комнат',
    title: 'много комнат',
  },
];

export const ADVERTISER_TYPES: AdStateItem[] = [
  {
    id: 'no_matter',
    tag: null,
    title: 'Без разницы',
  },
  {
    id: 'owner',
    tag: 'собственник',
    title: 'Собственник',
  },
  {
    id: 'agency',
    tag: 'агентство',
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
    tag: index.toString(),
    title: city,
  };
});
