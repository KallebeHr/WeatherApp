<template>
  <div class="container">
    <div id="map" ref="mapContainer"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const mapContainer = ref(null);

onMounted(() => {
  // Verifica se o contêiner do mapa está disponível
  if (mapContainer.value) {
    // Inicializa o mapa
    const map = L.map(mapContainer.value).setView([-5.0833, -42.8167 ], 14); 

    // Adiciona o tile layer do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Adiciona um marcador
    L.marker([-5.0833, -42.8167]).addTo(map)
      .bindPopup('São Paulo, Brasil')
      .openPopup();
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