export const WIDTH_BTN_CTN:number = 100
export const HEIGHT_BTN_CTN:number = 70
type Dictionary<Key extends keyof any, Value> = {
    [key in Key]: Value
}
interface Coord {
    x:number
    y:number
}
interface Continent {
    coordinate: Coord,
    abbr: string,
    continentImg:string
}
export const POSITION_NAME_MAP : Dictionary<string, Continent> = {
    "North America":{coordinate:{x:110, y:470},abbr:"na", continentImg:"NorthAmerica"},
    "Europe":{coordinate:{x:750, y:450},abbr:"eu", continentImg:"Europe"},
    "South America":{coordinate:{x:350, y:800},abbr:"sa", continentImg:"SouthAmerica"},
    "Africa":{coordinate:{x:850, y:800},abbr:"af", continentImg:"Africa"},
    "Asia":{coordinate:{x:1750, y:450},abbr:"as", continentImg:"Asia"},
    "Australia":{coordinate:{x:1800, y:750},abbr:"au", continentImg:"Australia"}
}