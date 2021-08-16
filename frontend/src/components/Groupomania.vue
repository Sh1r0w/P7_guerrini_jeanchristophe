<template>
  <div class="home">
    <h1>{{ msg }}</h1>
    <div id="connection" class="container col-lg-3 card">
      Votre Mail:
      <input
        type="text"
        v-model="login"
        v-bind:class="{ 'form-control is-valid': testMail }"
        required
      />
      Votre mot de passe:<input
        type="password"
        v-model="password"
        v-bind:class="{ 'form-control is-valid': testPassword }"
        required
      />
      <div
        v-for="error in errors"
        :key="error.indexOf(errors)"
        class="alert alert-danger"
        role="alert"
      >
        {{ errors }}
      </div>
      <button class="btn btn-success m-2" @click.prevent="validLogin">
        Connection
      </button>
      <p>
        Pas encore inscrit :
        <router-link to="/registration">Enregistrement</router-link>
      </p>
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
  name: "Groupomania",
  props: {
    msg: String,
  },

  data() {
    return {
      login: "",
      password: "",
      errors: [],
    };
  },

  methods: {
    //Validation du login aprés test du regex
    validLogin() {
      this.errors = [];
      if (!this.login || !this.password) {
        this.errors.push("Aucun login / mot de passe renseigner");
      } else {
        axios
          .post("http://localhost:3000", {
            login: this.login,
            password: this.password,
          })
          .then(
            (reponse) =>
              localStorage.setItem("token", reponse.data.token) &
              this.$router.push("/message")
          )
          .catch((error) => {
            if (error.response.status == 401) {
              this.errors.push("Mot de passe incorrect");
            }
          });
      }
    },
  },
  computed: {
    //test du regex
    testMail() {
      let re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(this.login);
    },
    testPassword() {
      let re =
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm;
      return re.test(this.password);
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
