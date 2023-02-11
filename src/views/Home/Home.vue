<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import './styles.scss'
  import api from '../../services/index'

  const header = ref("pokemon list")
  const inputValue = ref('')

  export default defineComponent({
    name:'home',
    setup() {
        const pokemons = ref([]);
        const fetchPokemons = async () => {
         const response = await api.get("/pokemon?limit=20")
         pokemons.value = response.data.results
        }
      onMounted(fetchPokemons);

      return {
        pokemons,
        header,
        inputValue
      }
    },
  })
</script>


<template>
  <main class="home">
      <h2>{{ header }}</h2>
      <div>
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        <input 
          v-model="inputValue" 
          type="text"
          maxlength="20"
          placeholder="search pokemon" />
        </div>
      <ul>
        <li>{{ pokemons }}</li>
      </ul>
  </main>
</template>