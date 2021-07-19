<template>
  <div class="RegistrationHome">
    <h1>{{ msg }}</h1>
    <div id="record">
      Votre Nom: <input type="text" id="lastName" required /><br />
      Votre Prénom: <input type="text" id="firstName" required /><br />
      Votre Mail: <input type="text" id="mail" required /><br />
      Votre mot de passe:<input type="password" id="password" required /><br />
      Vérification de votre mot de passe:<input
        type="password"
        id="passwordVerification"
        required
      /><br />
      <button @click.prevent="addUser">Inscription</button>
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
    lastName: "",
    firstName: "",
    mail: "",
    password: "",
    passwordVerification: "",
  }
  },
  methods: {
    addUser() { if (this.password != this.passwordVerification) {
      console.log('bad password')
      } else {
      this.lastName = document.getElementById('lastName').value,
      this.firstName = document.getElementById('firstName').value,
      this.mail = document.getElementById('mail').value,
      this.password = document.getElementById('password').value,
      this.passwordVerification = document.getElementById('passwordVerification').value,
      console.log('ok'),

        axios.post('http://localhost:3000/registration', {
      body: JSON.stringify(
      this.data
      ),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      }).then(reponse => console.log(reponse.data));
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
