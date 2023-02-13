<script lang="ts">
  import { computed, defineComponent, onMounted, ref } from 'vue';
  import './styles.scss'
  import api from '../../services/index'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { RouterLink } from 'vue-router';
  import { Errs, Pokemons } from '../../@types';
  import ListPokemons from '../../components/ListPokemons/ListPokemons.vue'

  const header = ref("pokemon list");
  const inputValue = ref('')
  export default defineComponent({
    name:'home',
    components:{
      ListPokemons,
    },
    setup() {
      const error = ref<Errs>({state: false, message: ""});
      const pokemons = ref<Pokemons[]>([]);
      const hasError = computed(() => error.value.state);
      const hasErrorMessage = computed(()=> error.value.message)
      const handler = async () => {
        try {
          const response = await api.get(`/pokemon/${inputValue.value.toLocaleLowerCase()}`)
          error.value =  { 
            state: false,
            message: ""
          }
          pokemons.value.push({
            id: pokemons.value.length + 1,
            label: inputValue.value,
            image: response.data.sprites.front_default
          })
          inputValue.value = ""
          
        } catch(err) {
          error.value = { 
            state: true,
            message: "Dígite um nome de pokemon válido"
          }
        }
      }
      return {
        pokemons,
        header,
        inputValue,
        handler,
        error,
        hasError,
        hasErrorMessage,
      }
    },
  })
</script>


<template>
  <main class="home">
      <h2>{{ header }}</h2>
      <form
        @submit.prevent="handler"
        :class="{error: hasError}"
      >
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        <input 
          v-model.trim="inputValue" 
          type="text"
          maxlength="20"
          placeholder="search pokemon" />
          <button type="submit">
            <font-awesome-icon icon="fa-solid fa-plus" />
          </button>
        </form>
        <span>{{ hasErrorMessage }}</span>
        <ul>
          <ListPokemons v-for="pokemon in pokemons" :key="pokemon.id" :pokemons="pokemon" />
        </ul>
  </main>
</template>