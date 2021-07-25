<template>
  <div class="RegistrationHome">
    <h1>{{ msg }}</h1>
    <div id="record" class="container col-3 card p-3">
      Votre Nom: <input type="text" id="lastName" v-model="lastName" required /><br />
      Votre Prénom: <input type="text" id="firstName" v-model="firstName" required /><br />
      Votre Mail: <input type="text" id="email" v-model="email" required /><br />
      Votre mot de passe:<input type="password" id="password" v-model="password" required /><br />
      Vérification de votre mot de passe:<input type="password" id="passwordVerification" v-model="passwordVerification" required/><br />
      <button class="btn btn-success" @click.prevent="addUser">Inscription</button>
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
    addUser() { if (this.password != this.passwordVerification) {
      console.log('bad password')
      } else {
        axios.post('http://localhost:3000/registration', {
      lastName: this.lastName,
      firstName: this.firstName,
      email: this.email,
      password: this.password
        })
      .then(reponse => console.log(reponse.data));

    }
  },
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #112341;
}
</style>
