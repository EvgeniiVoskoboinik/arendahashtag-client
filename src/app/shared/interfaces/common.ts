export interface AdStateItem{
  id: string | number;
  title: string;
}

export interface AdState{
  adType: AdStateItem[];
  propertyType: AdStateItem[];
  city: AdStateItem[];
  leaseTerm: AdStateItem[];
  roomsCount: AdStateItem[];
  advertiser: AdStateItem[];
}
