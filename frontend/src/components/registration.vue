<template>
  <div class="RegistrationHome">
    <h1>{{ msg }}</h1>
    <div v-if="this.showValid" class="alert alert-success">
      Votre compte est bien enregistré. Merci de vous connectez une premiére
      fois
      <router-link to="/"
        ><button class="btn btn-success">Connection</button></router-link
      >
    </div>
    <form
      id="record"
      class="container col-lg-3 card p-2"
      @submit.prevent="validForm"
      autocomplete="off"
      novalidate
    >
      <input
        placeholder="Votre Nom"
        type="text"
        id="lastName"
        v-model="lastName"
        v-bind:class="{ 'form-control is-valid': testLastName }"
        required
      /><br />
      <input
        placeholder="Votre Prénom"
        type="text"
        id="firstName"
        v-model="firstName"
        v-bind:class="{ 'form-control is-valid': testFirstName }"
        required
      /><br />
      <input
        placeholder="Votre Mail"
        type="email"
        id="email"
        v-model="email"
        v-bind:class="{ 'form-control is-valid': testMail }"
        required
      /><br />
      Votre mot de passe:<input
        type="password"
        id="password"
        v-model="password"
        v-bind:class="{ 'form-control is-valid': testPassword }"
        required
      /><br />
      Vérification de votre mot de passe:<input
        type="password"
        id="passwordVerification"
        v-model="passwordVerification"
        v-bind:class="{ 'form-control is-valid': testPasswordVerif }"
        required
      /><br />
      <button class="btn btn-success" @click.prevent="addUser()">
        Inscription
      </button>
      <p>Déjà inscrit : <router-link to="/">Connection</router-link></p>
      <div>
        votre mot de passe doit contenire:
        <div>
          <ul>
            <li>Au moins 1 minuscule</li>
            <li>Au moins 1 Majuscule</li>
            <li>Au moins 1 chiffre</li>
            <li>Au moins 1 caractère spécial</li>
            <li>8 - 16 Caractères sans espace</li>
          </ul>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
const axios = require("axios").default;
export default {
  name: "Registration",
  props: {
    msg: String,
  },

  data() {
    return {
      lastName: "",
      firstName: "",
      email: "",
      password: "",
      passwordVerification: "",
      showValid: false,
    };
  },

  computed: {
    //test des inputs avec different regex
    testFirstName() {
      let re = /^[a-zéèçà]{2,50}(-| )?([a-zéèçà]{2,50})?$/gim;
      return re.test(this.firstName);
    },

    testLastName() {
      let re = /^[a-zéèçà]{2,50}(-| )?([a-zéèçà]{2,50})?$/gim;
      return re.test(this.lastName);
    },

    testMail() {
      let re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(this.email);
    },

    testPassword() {
      let re =
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm;
      return (
        re.test(this.password) && this.password == this.passwordVerification
      );
    },

    testPasswordVerif() {
      let re =
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm;
      return (
        re.test(this.passwordVerification) &&
        this.password == this.passwordVerification
      );
    },
  },
  methods: {
    //création d'un compte utilisateur
    addUser() {
      if (this.password != this.passwordVerification) {
        console.log("bad password");
      } else {
        axios
          .post("http://localhost:3000/registration", {
            lastName: this.lastName,
            firstName: this.firstName,
            email: this.email,
            password: this.password,
          })

          .then((this.showValid = true));
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #112341;
}
</style>
