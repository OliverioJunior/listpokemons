<script lang="ts">
import './styles.scss'
import { Pokemons } from '../../../src/@types'
import { PropType, defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
export default defineComponent({
  name: 'ListPokemons',
  props:{ 
    pokemons: {
      type: Object as PropType<Pokemons>,
      require: true
    }
  },
  computed: {
    label() {
      return this.pokemons?.label
    },

    image() {
      return this.pokemons?.image
    }
  }
})
    

</script>
<template>
     <li>
      <RouterLink v-bind:key="label"  :to="`/pokemon/${label}`">
        <p>{{ label }}</p>
        <img :src="image" :alt="label" />
      </RouterLink>
    </li>
</template>