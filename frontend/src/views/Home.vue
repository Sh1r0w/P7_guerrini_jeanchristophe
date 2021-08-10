<template>
  <div class="home">
    <img alt="Groupomania Forum" src="../assets/icon-left-font-monochrome-black.svg" class="img-fluid">
    <Groupomania/>
  </div>
</template>

<script>
// @ is an alias to /src
import Groupomania from '@/components/Groupomania.vue'

export default {
  name: 'Home',
  components: {
    Groupomania
  }
}
</script>

<style scoped>

</style>