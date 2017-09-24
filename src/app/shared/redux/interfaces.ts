export interface AdStateItem{
  id: string;
  title: string;
}
export interface AdState{
  adType: string[];
  propertyType: string[];
  city: string[];
  leaseTerm: string[];
  roomsCount: string[];
  advertiser: string[];
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
