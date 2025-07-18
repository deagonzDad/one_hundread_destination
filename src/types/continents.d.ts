type Dictionary<Key extends string, Value> = {
  [key in Key]: Value;
};
interface Coord {
  x: number;
  y: number;
}
interface Continent {
  coordinate: Coord;
  abbr: string;
  continentImg: string;
}
interface PlaceInfo {
  country: string;
  interest: string;
  tripTime: number;
  stayTime: number;
  weather: string;
  farForMe: number;
}

interface Places {
  [key: string]: PlaceInfo;
}
interface IHTMLPlaceElement extends HTMLElement {
  countryKey: string | undefined;
  placeKey: string | undefined;
  continentName: string | undefined;
  placeName: string | undefined;
}

interface IContinentSVG extends HTMLElement {
  WIDTH_BTN: Number;
}
interface IHTMLAnchorElement extends HTMLElement {
  hrefRaw: string | undefined;
}
interface IPlace extends HTMLElement {
  mapping: Dictionary<string, string>;
  countryKey: string;
  visitKey: string;
  countryName: string;
  placeName: string;
}
