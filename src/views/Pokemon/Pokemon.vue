<template>
  <div>
    <h2>{{ $route.params.id }}</h2>
  </div>
</template>

<script lang="ts">
  export default {
    computer: {
      destinationId() {
        // return parseInt(this.$route.params.id)
      }
    }
  }
</script>