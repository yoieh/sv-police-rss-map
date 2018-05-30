
export const policeFeed = citiesData =>
  fetch(
    "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fpolisen.se%2Faktuellt%2Frss%2Fhela-landet%2Fhandelser-i-hela-landet%2F&api_key=fawndqhob4zhoodlzuy3xadoa2gclztcih1gzr6u&count=1000"
  )
    .then(response => response.json()).then(data => data.items)