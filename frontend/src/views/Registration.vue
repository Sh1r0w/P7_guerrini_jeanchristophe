<template>
    <div class="registration">
        <img alt="Vue logo" src="../assets/icon-left-font-monochrome-black.svg">
        <registration msg="Enregistrement de votre compte"/>
    </div>
</template>

<script>
import registration from '@/components/registration.vue'

export default {
 name: 'Registration',
  components: {
    registration
  }
}
</script>
