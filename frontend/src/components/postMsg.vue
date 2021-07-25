<template>
  <div class="blocMsg" v-if="revele">
    <div class="class container overlay">
      <div class="card msg">
        <h2>Nouveau Message</h2>
        Titre de votre Message :<input type="text" v-model="newTitle" /> <br />
        Votre Texte :<input type="textarea" v-model="newMsg" />
        <button @click.prevent="addNewMsg" class="btn btn-success m-2">
          Envoyé Message
        </button>
        <button v-on:click="toggleNewMsg" class="btn btn-danger m-2">
          Annulé
        </button>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios").default;
export default {
  name: "newMsg",
  props: ["revele", "toggleNewMsg"],

  data() {
    return {
      newTitle: "",
      newMsg: "",
    };
  },
  methods: {
    addNewMsg() { if(!this.newTitle || !this.newMsg) {
      alert('Titre ou Texte non renseigner')
        }else{ 
          axios.post("http://localhost:3000/message/newMsg", {
          newTitle: this.newTitle,
          newMsg: this.newMsg,
        })
        .then((reponse) => console.log(reponse.data));
        }
    },
  },
};
</script>

<style scoped>
.blocMsg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(241,241,241, 0.5);
}

.overlay {
  background: rgba(0, 0, 0, 0, 5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.msg {
  background: #f1f1f1;
  color: #333;
  padding: 50px;
  position: fixed;
  top: 10%;
  box-shadow: 10px 5px 5px grey;
}
</style>