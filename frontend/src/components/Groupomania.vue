<template>
  <div class="home">
    <h1>{{ msg }}</h1>
      <div id="connection" class="container col-lg-3 card ">
      Votre Mail: <input type="text" v-model="login" required/>
      Votre mot de passe:<input type="password" v-model="password" required/>
      <button class="btn btn-success m-2" @click.prevent="validLogin">Connection</button>
      <p>Pas encore inscrit : <router-link to="/registration">Enregistrement</router-link></p>
      <div id="wrongPassword" class="card">
      votre mot de passe doit contenire:
      <ul>
        <li>Au moins 1 minuscule</li>
        <li>Au moins 1 Majuscule</li>
        <li>Au moins 1 chiffre</li>
        <li>8 - 16 Caractère sans espace</li>
      </ul>
      </div>
      </div>
      
  </div>
</template>

<script>
const axios = require("axios").default;
export default {
  name: 'Groupomania',
  props: {
    msg: String,
  },

  data(){ 
    return {
      login: "",
      password: ""
    }
  },
  methods: {
    validLogin() {
      if (!this.login || !this.password){
        console.log('Aucun login / mot de passe renseigner')
      } else {
        axios.post('http://localhost:3000',{
          login: this.login,
          password: this.password
        })
        .then(reponse => sessionStorage.setItem('token', reponse.data.token) & this.$router.push('/message'))
     }
  }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

a {
  color: #112341;
}

</style>
