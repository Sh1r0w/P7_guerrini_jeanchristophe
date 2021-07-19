<template>
  <div class="home">
    <h1>{{ msg }}</h1>
      <div id="connection">
      Votre Mail: <input type="text" id="login" required/>
      Votre mot de passe:<input type="text" id="password" required/>
      <input type="submit" id="validLogin">
      </div>
  </div>
</template>

<script>
export default {
  name: 'Groupomania',
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
#connection {
  width: 10%;
  margin: auto;
}
</style>
