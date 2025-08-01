// import { POSITION_NAME_MAP } from "@constants/worldMapConstants";
// import type { APIRoute } from "astro";

// export const GET: APIRoute = async ({ params }) => {
//   const place = params.placesContent;
//   console.log(place);
//   const continentName = params.placesContent;
//   const placeString = `../../../src/assets/json/${continentName}.json`;
//   const dynamicImportJSON = await import(placeString, {
//     with: { type: "json" },
//   });
//   return new Response(JSON.stringify(dynamicImportJSON));
// };

// export async function getStaticPaths() {
//   return Object.entries(POSITION_NAME_MAP).map(([, { continentImg }]) => {
//     return {
//       params: { placesContent: continentImg },
//     };
//   });
// }
