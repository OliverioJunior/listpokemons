<script lang="ts">
  import { computed, defineComponent, onMounted, ref } from 'vue';
  import './styles.scss'
  import api from '../../services/index'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
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
      let boo = ref(false);
      const hasError = computed(() => error.value.state);
      const hasErrorMessage = computed(()=> error.value.message)
      
      onMounted(() => {
        const savedList = localStorage.getItem('@ListPokem')
        console.log(pokemons.value)
        if(savedList?.length) pokemons.value = JSON.parse(String(savedList))
      })

      const handler = async () => {
        try {
          const response = await api.get(`/pokemon/${inputValue.value.toLocaleLowerCase()}`)
          error.value =  { 
            state: false,
            message: ""
          }
          const local = {
            id: pokemons.value.length + 1,
            label: inputValue.value,
            image: response.data.sprites.front_default
          }
          pokemons.value.push(local)
          localStorage.setItem('@ListPokem', JSON.stringify(pokemons.value))
          inputValue.value = ""
          
        } catch(err) {
          error.value = { 
            state: true,
            message: "Dígite um nome de pokemon válido"
          }
          console.log(err)
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