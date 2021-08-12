<template>
  <div class="MessageHome">
    <h1 >{{ msg }}</h1>
    <p>Nous sommes le : {{ currentDate() }} il est : {{ currentTime() }}</p>
    <button @click="toggleNewMsg(); refreshMessage();" class="m-2 btn btn-success">
      Nouveau Message
    </button>

    <div class="selectMsg d-flex flex-column">
      <div class="col-lg-5 col-sm-12 container">
        <h2>Messages Recents</h2>
            <div @click.prevent="selectOne(post.id)" id="msgCard" class="card p-3 m-4" v-for="post in posts" :key="post.id">
              <div class="d-flex p-2"><h2>{{ post.title }}</h2> </div>
              
              <div class="d-flex text-muted p-2 justify-content-end">{{ post.createdAt | moment("D/M/Y") }}</div>
              <img v-if="post.imgUrl != null" :src="post.imgUrl" :alt="post.title" class="shadow" loading="lazy">
               <div class="d-flex m-2"><i v-if="post.like != 0" :class="{'text-success' : post.likes[0] != undefined && post.id == post.likes[0].MessageId && post.likes[0].liked == 1}" class="fas fa-heart m-2"> {{ post.like }} </i><i v-if="post.dislike != 0" :class="{'text-danger' : post.likes[0] != undefined && post.id == post.likes[0].MessageId && post.likes[0].disliked == 1}" class="fas fa-heart-broken m-2"> {{ post.dislike }}</i> 
               <i class="fas fa-comments m-2 text-primary" > {{ post.reponse }} </i></div>
            </div>
            
      </div>
      <br />
    </div>
    <newMessage
      v-bind:revele="revele"
      v-bind:toggleNewMsg="toggleNewMsg"
      v-bind:refreshMessage="refreshMessage"
    ></newMessage>
    <readMessage v-bind:revele="toggleReadMsg" v-bind:selectOne="selectOne" v-bind:refreshMessage="refreshMessage">
      
    </readMessage>
    <accountBox v-bind:refreshMessage="refreshMessage"></accountBox>
  </div>
</template>

<script>
import newMsg from "@/components/postMsg.vue";
import boxAcc from "@/components/boxAccount.vue";
import readMsg from "@/components/readMessage.vue";

const axios = require("axios").default;
export default {
  name: "Post",
  components: {
    newMessage: newMsg,
    accountBox: boxAcc,
    readMessage: readMsg,
  },

  beforeCreate() {
    (axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.token}`)
    
  },
  created() {
    axios
    .get("http://localhost:3000/user")
    .then((reponse) => (this.$store.commit("GET_USER", reponse.data)))
      .catch((error) => console.log(error));

    axios
      .get("http://localhost:3000/message")
      .then((reponse) => (this.posts = reponse.data) && console.log(reponse.data))
      .catch((error) => console.log(error));

      axios
      .get("http://localhost:3000/like/looklike")
      .then((reponse) => (this.$store.commit("GET_LIKE", reponse.data)))
      .catch((error) => console.log(error));
  },
  

  props: {
    msg: String,
  },

  data() {
    return {
      posts: [],
      revele: false,
      toggleReadMsg: false,
      userEncrypted: [],
      looklike: [],
      isActive: true,
      
    };
  },
  methods: {
    selectOne: function(id) {

      axios.get('http://localhost:3000/message/' + id)
    .then((reponse) => this.$store.commit("GET_MSGID", reponse.data) & (this.toggleReadMsg = !this.toggleReadMsg))
    },

    refreshMessage: function () {
     
    axios
      .get("http://localhost:3000/message")
      .then((reponse) => (this.posts = reponse.data))
      .catch((error) => console.log(error))
    },

    toggleNewMsg: function () {
      this.revele = !this.revele;
    },
    currentDate(){
      const current = new Date();
      const date = current.getDate() + '/' + (current.getMonth()+1) + '/' + current.getFullYear()
      return date
    },
    currentTime(){
        const current = new Date();
        const time = current.getHours() + ':' + current.getMinutes()
        return time
    },
  },
  computed: {

     
  }
};
</script>

<style scoped>

#msgCard{
  cursor: pointer;
}
</style>