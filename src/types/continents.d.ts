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