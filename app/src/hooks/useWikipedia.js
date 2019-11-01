
const WIKI_URL = 'https://en.wikipedia.org/w/api.php?';
const QUERY = 'action=query&origin=*'
const FORMATTER = 'prop=info|images&inprop=url&utf8=&format=json';

export const getWikipediaSearch = async (query) => {
  const SEARCH_URL = WIKI_URL + QUERY + `&list=search&srsearch=${query}&` + FORMATTER;
  const response = await fetch(SEARCH_URL)
  return await response.json();
}

export const getWikpediaPage = async (id, setWikiData) => {
  const SEARCH_URL = WIKI_URL + QUERY + `&pageids=${id}&` + FORMATTER;
  const response = await fetch(SEARCH_URL)
  const json = await response.json();
  setWikiData(json);
}

export const useNearbyPlace = async ({ x, y }) => {
  const NEARBY_URL = 
    WIKI_URL + 
    QUERY + 
    `&prop=coordinates|pageimages|description|info` +
    `&inprop=url` +
    `&pithumbsize=144` +
    `&generator=geosearch` +
    `&ggsradius=10000` +
    `&ggslimit=100` +
    `&ggscoord=${y}|${x}` +
    `&format=json`;
  const response = await fetch(NEARBY_URL)
  const json = await response.json();
  return json;
}