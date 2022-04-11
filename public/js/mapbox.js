/* eslint-disable */

console.log('Hello from the client side!');
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoiYW5pbGlyaWFuIiwiYSI6ImNrNTRkN25seTAya2kzbG1xczNxZHYyb3YifQ.Lpd9NipXmYqXr5OjEuOErQ';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/anilirian/cl1nlrpt4000414qjfl01gk2u',
  scrollZoom: false
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
  //Create marker
  const el = document.createElement('div');
  el.className = 'marker';

  //Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom'
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  //Add popup
  new mapboxgl.Popup({
    offset: 30
  })
    .setLngLat(loc.coordinates)
    .setLngLat(loc.coordinates)
    .setHTML(`<p>${loc.day} : ${loc.description}</p>`)
    .addTo(map);

  // Extends map  bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 50,
    right: 50
  }
});
