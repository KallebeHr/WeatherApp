<template>
  <div class="container">
    <div id="map" ref="mapContainer"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useWorldStore } from '@/stores/world';
import { storeToRefs } from 'pinia';

// Store
const weatherStore = useWorldStore();

// Corrigir o caminho dos ícones do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Coordenadas da store
const { lat, lon, city } = storeToRefs(weatherStore);

const mapContainer = ref(null);
let map = null;
let marker = null;

onMounted(() => {

  if (mapContainer.value) {
    // Inicia o mapa
    map = L.map(mapContainer.value).setView([lat.value, lon.value], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">KallebeMax</a> Desenvolvedor',
    }).addTo(map);

    // marcador
    marker = L.marker([lat.value, lon.value])
      .addTo(map)
      .bindPopup(city.value)
      .openPopup();
  }
});

// Observador
watch([lat, lon], ([newLat, newLon]) => {
  if (map && marker) {
    map.setView([newLat, newLon], 14);
    marker.setLatLng([newLat, newLon]).bindPopup(city.value).openPopup();
  }
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  height: 100vh;
}

#map {
  height: 35rem;
  width: 45rem;
  border-radius: 10px;
  border: solid white 10px;
}

@media (max-width: 740px) {
  #map {
    height: 20rem;
    width: 20rem;
    border: none;
  }
}
</style>