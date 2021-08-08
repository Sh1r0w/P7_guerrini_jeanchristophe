<template>
  <div class="RegistrationHome">
    <h1>{{ msg }}</h1>
    <div id="record" class="container col-lg-3 card p-3">
      <p v-if="this.$store.allUser == null"> premier compte </p>
      Votre Nom: <input type="text" id="lastName" v-model="lastName" required /><br />
      Votre Prénom: <input type="text" id="firstName" v-model="firstName" required /><br />
      Votre Mail: <input type="text" id="email" v-model="email" required /><br />
      Votre mot de passe:<input type="password" id="password" v-model="password" required /><br />
      Vérification de votre mot de passe:<input type="password" id="passwordVerification" v-model="passwordVerification" required/><br />
      <button class="btn btn-success" @click.prevent="addUser(); token();">Inscription</button>
     <p> Déjà inscrit : <router-link to="/">Connection</router-link> </p>
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
const axios = require('axios').default;
export default {
  name: "Registration",
  props: {
    msg: String,
  },

  data() {
    return {
    lastName: '',
    firstName: '',
    email: '',
    password: '',
    passwordVerification: ''
  }
  },
  methods: {
    beforeCreate: function(){
      axios
      .get("http://localhost:3000/alluser")
      .then(reponse => (this.$store.commit("GET_ALLUSER", reponse.data)))
      .catch((error) => console.log(error))
    },  


    addUser() { if (this.password != this.passwordVerification) {
      console.log('bad password')
      } else {
        axios.post('http://localhost:3000/registration', {
      lastName: this.lastName,
      firstName: this.firstName,
      email: this.email,
      password: this.password
        })
      .then(reponse => sessionStorage.setItem('token', reponse.data.token) & this.$router.push('/message'));

    }
  },
  token(){
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.token}`
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
