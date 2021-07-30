<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/icon-left-font-monochrome-black.svg">
    <Groupomania msg="Bienvenu sur Groupomania"/>
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
img{
  width: 60%;
}
</style>