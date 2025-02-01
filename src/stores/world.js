import { defineStore } from 'pinia';

export const useWorldStore = defineStore('world', {
  state: () => ({
    // Coordenadas e cidade
    lat: -4.4167,
    lon: -41.4667,
    city: 'Pedro II',

    // Dados do clima
    temperature: '',
    condition: '',
    termica: '',
    icon: '',
    vento: '',
    humidity: '',
    localTime: '12'
  }),
  actions: {
    // coordenadas
    setCoordinates(lat, lon, city, temperature) {
      this.lat = lat;
      this.lon = lon;
      this.city = city;
      this.temperature = temperature;
    },

    // dados do clima
    setWeatherData(data) {
      this.temperature = data.temperature;
      this.condition = data.condition;
      this.termica = data.termica;
      this.icon = data.icon;
      this.vento = data.vento;
      this.humidity = data.humidity;
      this.localTime = data.localTime;
    },
  },
});