<template>
  <div class="boxAccount">
    <div class="col-2 littleBox card container p-2">
      Votre Compte <br />
      <button @click="toggleAccount" class="btn btn-success">Mon Compte</button
      ><br />
      <button @click="canceled" class="btn btn-danger">Déconnection</button>
    </div>
    <div class="pageAccount" v-if="revele">
      <div class="card showAccount p-2">
        <h2>Mon Compte</h2>
        <div class="class card p-2 d-flex justify-content-between">
        Vos informations :<br/>
        Votre nom : {{ $store.state.user.lastName }} <br/>
        Votre Prénom : {{ $store.state.user.firstName }} <br/>
        Votre Adresse Mail : {{ $store.state.user.email }}<br/>
        </div>
        Votre Adresse Mail:<input type="text"/><br />
        
        Votre Nom: <input type="text" /><br />
        
        Votre Prénom: <input type="text" /><br />
        Modifié votre mot de passe:
        <button @click="toggleAccount" class="btn btn-success">Valider</button><br />
        <button @click="deleteAccount" class="btn btn-danger">Supprimer son compte</button>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios").default;
export default {
  name: "boxAcc",
  data(){
      return{
        revele: false
      }
  },
  methods: {
    myAccount() {
      console.log("My Account");
    },
    canceled() {
      sessionStorage.clear() & this.$router.push('/');
    },
    toggleAccount: function () {
      this.revele = !this.revele;
    },
    deleteAccount: function () {
      const r = confirm("Suppression");
      if (r == false) {
        this.revele = !this.revele
      } else {
        axios.post('http://localhost:3000/deleteUser')
        .then(this.$router.push('/') && sessionStorage.clear() & console.log('delete post'))
      }
    }
  }
  
};
</script>

<style scoped>
.littleBox {
  position: fixed;
  top: 10px;
  right: 10px;
}
.pageAccount {
  position: fixed;
  background-color: rgba(241,241,241, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  box-shadow: 10px 5px 5px grey;
}

</style>