<template>
  <div class="RegistrationHome">
    <h1>{{ msg }}</h1>
      <div id="enregistrement">
          Votre Nom: <input type="text" id="lastName" required/>
          Votre Prénom: <input type="text" id="firstName" required/>
          Votre Mail: <input type="text" id="mail" required/>
          Votre mot de passe:<input type="text" id="password" required/>
          Vérification de votre mot de passe:<input type="text" id="passwordVerification" required/>
      <input type="submit" id="validLogin">
      </div>
  </div>
</template>

<script>
export default {
  name: 'GroupomaniaRegistration',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #112341;
}

</style>
