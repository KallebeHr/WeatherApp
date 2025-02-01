<template>
    <header>
      <v-card-text>
        <div class="input-container">
          <v-text-field
            append-inner-icon="mdi-magnify"
            density="compact"
            autofocus
            maxlength="50"
            loading
            label="Buscar por Cidades..."
            variant="outlined"
            hide-details
            class="input"
            v-model="searchQuery"
            @input="fetchSuggestions"
            clearable
          ></v-text-field>
          
          <ul v-if="suggestions.length > 0" class="suggestions-list">
            <li
              v-for="suggestion in suggestions"
              :key="suggestion.id"
              @click="selectSuggestion(suggestion)"
            >
              {{ suggestion.name }}, {{ suggestion.region }} - {{ suggestion.country }}
            </li>
          </ul>
        </div>
      </v-card-text>
      <h1>WeatherMax</h1>
    </header>
    <div class="opts">
      <img :src="icon" class="icon" alt="Ícone do clima" v-if="icon" /> 
      <p >{{ city }} | {{ localTime }}</p>
      <img :src="icon" class="icon" alt="Ícone do clima" v-if="icon" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useWorldStore } from '@/stores/world';

// Variáveis Ref
const temperature = ref('');
const condition = ref('');
const termica = ref('')
const searchQuery = ref('');
const suggestions = ref([]);
const vento = ref('')
const apiKey = 'bed853d7af864a74813204847252801';

// pinia
const weatherStore = useWorldStore();
const localTime = computed(() => weatherStore.localTime)
const city = computed(() => weatherStore.city)
const icon = computed(() => weatherStore.icon)

// dados da API
async function fetchWeather(cityName) {
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&lang=pt`
    );
    
    weatherStore.setCoordinates(
      response.data.location.lat,
      response.data.location.lon,
      response.data.location.name,
      response.data.location.localtime
    );
    
    weatherStore.setWeatherData({
      temperature: response.data.current.temp_c,
      condition: response.data.current.condition.text,
      termica: response.data.current.feelslike_c,
      icon: response.data.current.condition.icon,
      vento: response.data.current.gust_kph,
      humidity: response.data.current.humidity,
      localTime: response.data.location.localtime.split(' ')[1]
    });
  } catch (error) {
    console.error('Erro ao buscar dados do clima:', error);
  }
}

// ao iniciar
onMounted(() => {
  fetchWeather('Pedro II');
});

// Buscar sugestões
async function fetchSuggestions() {
  if (searchQuery.value.length > 2) {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${searchQuery.value}`
      );
      suggestions.value = response.data;
    } catch (error) {
      console.error('Erro ao buscar sugestões:', error);
    }
  } else {
    suggestions.value = [];
  }
}

// sugestoes
function selectSuggestion(suggestion) {
  searchQuery.value = `${suggestion.name}, ${suggestion.region}`;
  suggestions.value = [];
  fetchWeather(searchQuery.value);
}


</script>

<style scoped>
header {
  background-color: #0079c2;
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.about{
  background-color: #ccc  ;
  text-align: center;
}
.cards{
  width: 25rem;
}
.icon{
  width: 32px;
}
.opts {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3rem;
  background-color: #004983;
}
.cardGeo{

}
.v-card-text {
  flex: none;
}

.input-container {
  position: relative; 
  width: 20rem; 
}

.input {
  width: 100%;
}

input::placeholder {
  color: white;
  font-size: 16px;
}

.suggestions-list {
  position: absolute; 
  top: 100%; 
  left: 0;
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  border: 1px solid #ccc;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
}

.suggestions-list li {
  padding: 0.5rem;
  text-align: left;
  cursor: pointer;
  color: black;
}

.suggestions-list li:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
/* Tablets (768px - 1024px) */
@media (max-width: 1024px) {

}

@media (max-width: 840px) {
  .container-center{
    flex-direction: column;
}
header{
  flex-direction: column-reverse;
  height: auto;
}
}

@media (max-width: 599px) {
}
</style>
