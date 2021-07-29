<template>
  <div class="row">
    <div class="col-12">
    <img class="" alt="Vue logo" src="../assets/icon-left-font-monochrome-black.svg">
    <Post msg="Bienvenue"/>
    </div>
  </div>
</template>

<script>
import Post from '@/components/Message.vue'

export default {
  name: 'Message',
  components: {
    Post
  }
}
</script>
<style lang="sass" scoped>

</style>