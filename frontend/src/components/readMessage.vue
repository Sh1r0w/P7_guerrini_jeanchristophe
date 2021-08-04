<template>
    <div class="container d-flex position-absolute" v-if="revele" id="readingMessage" >

            <div class="back" ></div>
            <div class="overlay " @click="selectOne(); resetData();" > </div>
                <div class="card p-2">
            <h2>{{ $store.state.msgId.title }}</h2>
            <img v-if="$store.state.msgId.imgUrl != null" :src="$store.state.msgId.imgUrl" :alt="$store.state.msgId.title">
            <div id="txt">{{ $store.state.msgId.message }}</div>
              <div id="createdAt">{{ $store.state.msgId.createdAt }}</div>
              <div>
              Votre réponse : <br/>
              <input type="text" v-model="response">
              <input type="file" ref="filename" @change="onChangeFileUpload">
              <button @click="newResponse" class="btn btn-success m-2">Envoyer</button>
              </div>
              <button @click="allReponse" class="btn-success m-2">Voir les réponses</button>
              <div class="reponse card m-2 p-2"  v-for="reponses in oldReponse" v-bind:key="reponses.id">

                  <div v-if="reponses.userId == $store.state.user.id || $store.state.user.moderator == 1" @click="deleteReponse(reponses.id)" id="suppRep" class="btn btn-danger btn-sm">X</div>
                  <img :src="reponses.imgUrlReponse">
                  {{ reponses.reponse }} {{ reponses.createdAt }}
                  
 
              </div>
              <div id="adm" class="block-card"><button v-if="$store.state.msgId.userId == $store.state.user.id || $store.state.user.moderator == 1" class="btn btn-success">Modifier le message</button>
                    <button @click="deleteMsg" v-if="$store.state.msgId.userId == $store.state.user.id || $store.state.user.moderator == 1" class="btn btn-danger">Supprimer le message</button></div>

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
        onChangeFileUpload() {
            this.filename = this.$refs.filename.files[0];
        },
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

        resetData(){
            this.oldReponse = " "
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
  top: 200px;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  

}

.adm{
    position: absolute;
    left: 10px;
    top: 0;
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
}

#suppRep {
position: absolute;
right: 10px;
top: 4px;
}

</style>