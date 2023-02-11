<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import './styles.scss'
  import api from '../../services/index'

  interface Pokemons {
    id: number
    label: string
  }

  const header = ref("pokemon list");
  const error = ref();
  const inputValue = ref('')
  export default defineComponent({
    name:'home',
    setup() {
      const pokemons = ref<Pokemons[]>([]);
      const handler = async () => {
        try {
          const response = await api.get(`/pokemon/${inputValue.value}`)
          pokemons.value.push({
            id: pokemons.value.length + 1,
            label: inputValue.value
          })
        } catch(err) {
          error.value = err
        }
      }
      return {
        pokemons,
        header,
        inputValue,
        handler
      }
    },
  })
</script>


<template>
  <main class="home">
      <h2>{{ header }}</h2>
      <form
        @submit.prevent="handler"
      >
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        <input 
          v-model.trim="inputValue" 
          type="text"
          maxlength="20"
          placeholder="search pokemon" />
          <button v-on:click="">
            <font-awesome-icon icon="fa-solid fa-plus" />
          </button>
        </form>
        <ul>
          <li v-for="{id, label} in pokemons" :key="id">{{ label }}</li>
        </ul>
  </main>
</template>