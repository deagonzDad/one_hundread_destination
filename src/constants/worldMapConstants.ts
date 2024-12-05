import type { ImageMetadata } from "astro";
import { getImage } from "astro:assets";
export const WIDTH_BTN_CTN:number = 100
export const HEIGHT_BTN_CTN:number = 70
export const QUERYSTRING_COUNTRY_NAME: string = "country"
export const QUERYSTRING_PLACE_TO_VISIT: string = "place"
//TODO: correct the map the key need to be more easely to read and don't have space :C
export const POSITION_NAME_MAP : Dictionary<string, Continent> = {
    "North America":{coordinate:{x:110, y:470},abbr:"na", continentImg:"NorthAmerica"},
    "Europe":{coordinate:{x:750, y:450},abbr:"eu", continentImg:"Europe"},
    "South America":{coordinate:{x:350, y:800},abbr:"sa", continentImg:"SouthAmerica"},
    "Africa":{coordinate:{x:850, y:800},abbr:"af", continentImg:"Africa"},
    "Asia":{coordinate:{x:1750, y:450},abbr:"as", continentImg:"Asia"},
    "Australia":{coordinate:{x:1800, y:750},abbr:"au", continentImg:"Australia"}
}

//mapper imgs
const images = import.meta.glob<{default:ImageMetadata}>("/src/assets/images/continents/*.{jpeg,jpg,png,gif}")
export const imageMapping:Dictionary<string,string> = {}
const mappedData =  Object.entries(POSITION_NAME_MAP).map(async([_, {continentImg}])=>{
    const imgPath = `/src/assets/images/continents/${continentImg}.png`
    if(!images[imgPath]) throw new Error(`${imgPath} does not exist :(`)
    const tempImg = await getImage({src:images[imgPath]()})
    imageMapping[continentImg] = tempImg.src
})
await Promise.all(mappedData)