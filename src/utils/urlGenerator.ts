export function generateUrl(path: string): string {
  const baseUrl = import.meta.env.BASE_URL;
  const cleanPath = path.startsWith("/") ? path.substring(1) : path;
  return `${baseUrl}${cleanPath}`;
}

export const GetFile = async (path: string) => {
  const url = generateUrl(path);
  return await fetch(url);
};

export const GetJson = async (path: string) => {
  const url = await GetFile(`/${path}`);
  return await url.json();
};
