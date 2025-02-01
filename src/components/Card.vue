<template>
  <div class="container">
    <div class="card">
      <div class="card-title">
        <p>Tempo e hora agora em</p>
        <p>{{ city }}</p>
        <p>{{ localTime }} </p>
      </div>
      <div class="card-temp">
        <img :src="icon" alt="Ícone do clima" class="weather-icon" v-if="icon" />
        <p>{{ temperature }}°C</p>
      </div>
      <div class="card-alertAbout">
        <p>{{ condition }}</p>
        <p>Sensação {{ termica }}°C</p>
      </div>
      <div class="card-end">
        <ul>
          <li><p>🌬️ Vento</p> <p>{{ vento }} km/h</p></li>
          <li><p>💧 Umidade</p> <p>{{ humidity }}%</p></li>
        </ul>
      </div>
      <p class="card-footer">Clima e previsão do tempo na WeatherMax</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useWorldStore } from '@/stores/world';

// Store
const worldStore = useWorldStore();

// Computed 
const city = computed(() => worldStore.city);
const temperature = computed(() => worldStore.temperature);
const condition = computed(() => worldStore.condition);
const termica = computed(() => worldStore.termica);
const icon = computed(() => worldStore.icon);
const vento = computed(() => worldStore.vento);
const humidity = computed(() => worldStore.humidity);
const localTime = computed(() => worldStore.localTime)
</script>
  
  <style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Arial', sans-serif;
  }
  
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    padding: 2rem;
    width: 100%;
    max-width: 20rem; 
    max-height: 35rem; 
    text-align: center;
  }
  
  .card-title {
    font-size: 1.5rem;
    color: #333;
  }
  
  .card-title p {
    margin: 0.5rem 0;
    font-size: 1.5rem;
  }
  
  .card-temp {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    color: #333;
  }
  
  .card-temp p {
    margin: 0 0.5rem;
  }
  
  .card-alertAbout {
    font-size: 1.2rem;
    color: #555;
    margin: 1rem 0;
  }
  
  .card-alertAbout p {
    margin: 0.5rem 0;
  }
  
  .card-end {
    width: 100%;
    margin: 1rem 0;
  }
  
  .card-end ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .card-end li {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #ddd;
  }
  
  .card-end li:last-child {
    border-bottom: none;
  }
  
  .card-end p {
    margin: 0;
    font-size: 1rem;
    color: #555;
  }
  
  .card-footer {
    font-size: 0.9rem;
    color: #777;
    margin-top: 1.5rem;
  }
  
  /* Responsividade */
  @media (max-width: 850px) {
    .card {
      padding: 1rem; /* Reduz ainda mais o padding em telas muito pequenas */
      max-width: 95%; /* Aumenta a largura máxima */
      max-width: 25rem;
    }
  }

  @media (max-width: 768px) {
    .card {
      padding: 1.5rem; /* Reduz o padding em telas menores */
      max-width: 90%; /* Aumenta a largura máxima para ocupar mais espaço */
      max-width: 25rem;

    }
  
    .Card-tittle {
      font-size: 1.3rem; /* Reduz o tamanho da fonte do título */
    }
  
    .card-temp {
      font-size: 2rem; /* Reduz o tamanho da fonte da temperatura */
    }
  
    .card-alertAbout {
      font-size: 1rem; /* Reduz o tamanho da fonte das informações */
    }
  
    .card-end p {
      font-size: 0.9rem; /* Reduz o tamanho da fonte dos detalhes */
    }
  
    .card-footer {
      font-size: 0.8rem; /* Reduz o tamanho da fonte do rodapé */
    }
  }
  
  @media (max-width: 480px) {
    .card {
      padding: 1rem; /* Reduz ainda mais o padding em telas muito pequenas */
      max-width: 95%; /* Aumenta a largura máxima */
      max-width: 25rem;

    }
  
    .Card-tittle {
      font-size: 1.2rem; /* Ajusta o tamanho da fonte para telas muito pequenas */
    }
  
    .card-temp {
      font-size: 1.8rem; /* Ajusta o tamanho da fonte da temperatura */
    }
  
    .card-alertAbout {
      font-size: 0.9rem; /* Ajusta o tamanho da fonte das informações */
    }
  
    .card-end p {
      font-size: 0.8rem; /* Ajusta o tamanho da fonte dos detalhes */
    }
  
    .card-footer {
      font-size: 0.7rem; /* Ajusta o tamanho da fonte do rodapé */
    }
  }
  </style>