import { defineStore } from 'pinia';

export const useWorldStore = defineStore('weather', {
  state: () => ({
    lat: -4.4167, 
    lon: -41.4667, 
    city: 'Pedro ii'
  }),
  actions: {
    setCoordinates(lat, lon, city) {
      this.lat = lat;
      this.lon = lon;
      this.city = city
    },
  },
});