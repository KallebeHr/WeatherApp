<template>
  <div class="header">
    <input
      type="text"
      v-model="searchQuery"
      @input="fetchSuggestions"
      placeholder="Digite a cidade ou estado..."
    />
    <ul v-if="suggestions.length > 0" class="suggestions-list">
      <li
        v-for="suggestion in suggestions"
        :key="suggestion.id"
        @click="selectSuggestion(suggestion)"
      >
        {{ suggestion.name }}, {{ suggestion.region }} - {{ suggestion.country }}
      </li>
    </ul>
    <h1>Clima em {{ city }}</h1>
    <p>Horário Local: {{ localTime }}</p>
    <p>Temperatura: {{ temperature }}°C</p>
    <p>Condição: {{ condition }}</p>
    <img :src="icon" alt="Ícone do clima" v-if="icon" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Variaveis Ref
const city = ref('');
const temperature = ref('');
const condition = ref('');
const localTime = ref('');
const icon = ref('');
const searchQuery = ref('');
const suggestions = ref([]);
const apiKey = 'bed853d7af864a74813204847252801'; 
const lon = ref('')
const lat = ref('')

// Clima
async function fetchWeather(cityName) {
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&lang=pt`
    );
    city.value = response.data.location.name;
    temperature.value = response.data.current.temp_c;
    localTime.value = response.data.location.localtime.split(' ')[1]; 
    icon.value = response.data.current.condition.icon;
    condition.value = response.data.current.condition.text;
    console.log(response.data.location.lat)
    console.log(response.data.location.lon)
  } catch (error) {
    console.error('Erro ao buscar dados do clima:', error);
  }
}

// Cidades
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

// Suegestôes
function selectSuggestion(suggestion) {
  searchQuery.value = `${suggestion.name}, ${suggestion.region}`;
  suggestions.value = []; 
  fetchWeather(searchQuery.value); 
}

// Montar o componente
onMounted(() => {
  fetchWeather('Pedro ii piaui'); 
});
</script>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2rem;
}

input {
  background-color: rgba(240, 248, 255, 0.163);
  color: white;
  width: 22rem;
  height: 3rem;
  font-size: 1.3rem;
  font-weight: 700;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
}

input::placeholder {
  color: white;
}

.suggestions-list {
  list-style: none;
  margin-top: 1rem;
  padding: 0;
  width: 22rem;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  max-height: 550px;
  overflow-y: auto;
  color: black;
}

.suggestions-list li {
  padding: 0.5rem;
  text-align: center;
  cursor: pointer;
}

.suggestions-list li:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>