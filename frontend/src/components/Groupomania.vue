<template>
  <div class="home">
    <h1>{{ msg }}</h1>
      <div id="connection" class="card p-2">
      Votre Mail: <input type="text" v-model="login" required/>
      Votre mot de passe:<input type="password" v-model="password" required/>
      <button class="btn btn-success m-2" @click.prevent="validLogin">Connection</button>
      </div>
  </div>
</template>

<script>
const axios = require("axios").default;
export default {
  name: 'Groupomania',
  props: {
    msg: String
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
        console.log('Aucun login / mot de pass renseigner')
      } else {
        axios.post('http://localhost:3000',{
          login: this.login,
          password: this.password
        })
        .then(reponse => localStorage.setItem('token', reponse.data.token) & this.$router.push('/message')  & (axios.defaults.headers.common['Authorization'] = `Bearer ${reponse.data.token}`))
      
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
#connection {
  width: 10%;
  margin: auto;
}
</style>
