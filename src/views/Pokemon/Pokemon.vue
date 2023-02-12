<template>
  <div>
    <h2>hello {{ $route.params.id }}</h2>
  </div>
</template>

<script lang="ts">
  export default {
    computer: {
      destinationId() {
        
        return parseInt(String(this.$route.params.id))
      }
    }
  }
</script>