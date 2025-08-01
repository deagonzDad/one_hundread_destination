export type Dictionary<Key extends string, Value> = {
  [key in Key]: Value;
};
export interface Coord {
  x: number;
  y: number;
}
export interface Continent {
  coordinate: Coord;
  abbr: string;
  continentImg: string;
}
export interface PlaceInfo {
  country: string;
  interest: string[];
  tripTime: number;
  stayTime: number;
  weather: string;
  farForMe: number;
}

export interface Places {
  [key: string]: PlaceInfo;
}
export interface IHTMLPlaceElement extends HTMLElement {
  countryKey: string | undefined;
  placeKey: string | undefined;
  continentName: string | undefined;
  placeName: string | undefined;
}

export interface IContinentSVG extends HTMLElement {
  WIDTH_BTN: number;
}
export interface IHTMLAnchorElement extends HTMLElement {
  hrefRaw: string | undefined;
}
export interface IPlace extends HTMLElement {
  mapping: Dictionary<string, string>;
  countryKey: string;
  visitKey: string;
  countryName: string;
  placeName: string;
}
