export interface AdStateItem{
  id: string;
  tag: string;
  title: string;
}
export interface AdState{
  adType: AdStateItem[];
  propertyType: AdStateItem[];
  city: AdStateItem[];
  leaseTerm: AdStateItem[];
  roomsCount: AdStateItem[];
  advertiser: AdStateItem[];
  description: string;
}
export interface AdAction{
  type: string | number;
  [prop: string]: any;
}
export interface EditValueAction extends AdAction{
  key: string;
  value: string;
}
