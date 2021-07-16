<template>
    <div class="registration">
        <img alt="Vue logo" src="../assets/icon-left-font-monochrome-black.svg">
        <GroupomaniaRegistration msg="Enregistrement de votre compte"/>
    </div>
</template>

<script>

import GroupomaniaRegistration from '@/components/GroupomaniaRegistration.vue'

export default {
 name: 'Registration',
  components: {
    GroupomaniaRegistration
  }
}
</script>
