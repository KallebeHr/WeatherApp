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

// Store do Pinia
const weatherStore = useWorldStore();

// Acesse as coordenadas diretamente do store
const { lat, lon, city } = storeToRefs(weatherStore);

const mapContainer = ref(null);
let map = null;
let marker = null;

onMounted(() => {
  // Verifica se o contêiner do mapa está disponível
  if (mapContainer.value) {
    // Inicializa o mapa com as coordenadas iniciais
    map = L.map(mapContainer.value).setView([lat.value, lon.value], 14);

    // Adiciona o tile layer do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Adiciona um marcador inicial
    marker = L.marker([lat.value, lon.value])
      .addTo(map)
      .bindPopup(city.value)
      .openPopup();
  }
});

// Observar mudanças nas coordenadas
watch([lat, lon], ([newLat, newLon]) => {
  if (map && marker) {
    // Atualiza a visualização do mapa e a posição do marcador
    map.setView([newLat, newLon], 14);
    marker.setLatLng([newLat, newLon]).bindPopup(city.value).openPopup();
  }
});
</script>

<style scoped>
.container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%
}
#map {
  height: 90%;
  width: 90%;
  margin-top: 20px;
  border-radius: 10px;
  border: solid white 10px;
}
</style>