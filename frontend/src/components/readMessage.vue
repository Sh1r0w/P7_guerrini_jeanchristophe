<template>
    <div class="container" v-if="revele" id="readingMessage" >
        <div class="card" >
            <div class="back" ></div>
            <div class="overlay" v-on:click="selectOne"> </div>
                <div class="card p-2">
            <h2>{{ $store.state.msgId.title }}</h2>
            <img v-if="$store.state.msgId.imgUrl != null" :src="$store.state.msgId.imgUrl" :alt="$store.state.msgId.title">
            <div id="txt">{{ $store.state.msgId.message }}</div>
              <div id="createdAt">{{ $store.state.msgId.createdAt }}</div>
              <div>
              Votre réponse : <br/>
              <input type="text" v-model="response">
              <button @click="newResponse" class="btn btn-success m-2">Envoyer</button>
              </div>
              <button @click="allReponse" class="btn-success m-2">Voir les réponses</button>
              <div class="reponse"  v-for="reponses in oldReponse" v-bind:key="reponses.id">

                  <div v-if="reponses.userId == $store.state.user.id || $store.state.user.moderator == 1" @click="deleteReponse(reponses.id)" id="suppRep" class="btn btn-danger btn-sm">X</div>
                  {{ reponses.reponse }} {{ reponses.createdAt }}
                  
 
              </div>
              <div id="adm" class="block-card"><button v-if="$store.state.msgId.userId == $store.state.user.id || $store.state.user.moderator == 1" class="btn btn-success">Modifier le message</button>
                    <button @click="deleteMsg" v-if="$store.state.msgId.userId == $store.state.user.id || $store.state.user.moderator == 1" class="btn btn-danger">Supprimer le message</button></div>

            </div>
            
        </div>

    </div>
</template>

<script>
const axios = require("axios").default;
export default {
    name: "readMsg",
    props: ["revele", "selectOne"],
        
    data() {
        return {
            response:"",
            filename:"",
            oldReponse:"",
        }
    },

    methods: {
        deleteMsg(){
            const r = confirm("Toutes supréssion du message sera definitive!")
            if(r == false){
                console.log("ok")
            }else {
            axios.delete("http://localhost:3000/message/deleteMsg/" + this.$store.state.msgId.id)
            .then(console.log('Message Supprimer'))
            .catch(console.log('No ok'))
            }
        },
        newResponse(){
            let formData = new FormData ();
          formData.append('reponse', this.response);
          formData.append('images', this.filename);

          axios.post("http://localhost:3000/reponse/" + this.$store.state.msgId.id , formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        },
        allReponse(){ 
            axios.get("http://localhost:3000/reponse/id/" + this.$store.state.msgId.id)
            .then((response) => (this.oldReponse = response.data))
            .catch((error) => console.log(error));
        },
        deleteReponse(id){ 
            const r = confirm("Toutes supréssion de la réponse sera definitive!")
            if(r == false){
                console.log("ok")
            }else {
            axios.delete("http://localhost:3000/reponse/deletereponse/" + id)
            .then(console.log('Message Supprimer'))
            .catch(console.log('No ok'))
            }
        }
    }
    
}
</script>

<style scoped>

#readingMessage {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
 overflow: auto;

}

.adm{
    position: absolute;
    left: 10px;
}

.overlay {
position: fixed;
  background-color: rgba(241,241,241, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

}

.reponse{
    position: relative;
    margin: 20px;

}

#suppRep {
position: absolute;
right: 10px;
}

</style>