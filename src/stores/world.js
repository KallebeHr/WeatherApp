import { defineStore } from 'pinia';

export const useWorldStore = defineStore('weather', {
  state: () => ({
    lat: -23.5505, 
    lon: -46.6333, 
    city: 'São Paulo'
  }),
  actions: {
    setCoordinates(lat, lon, city) {
      this.lat = lat;
      this.lon = lon;
      this.city = city
    },
  },
});