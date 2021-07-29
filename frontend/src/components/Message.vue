<template>
  <div class="MessageHome">
    <h1>{{ msg }}</h1>
    <button @click="toggleNewMsg" class="d-flex ms-5 mb-5 btn btn-success">
      Nouveau Message
    </button>

    <div class="selectMsg d-flex flex-column">
      <div class="col-5 container">
        <h2>Message Recents</h2>
        <div class="card">
        <ul>
          <li v-for="post in posts" v-bind:key="post" :href="'/' +post.id">{{ post.title }} {{ post.createdAt }}</li>
        </ul>
        </div>
      </div>
      <br/>
      </div>
    <newMessage
      v-bind:revele="revele"
      v-bind:toggleNewMsg="toggleNewMsg"
    ></newMessage>
    <accountBox></accountBox>
  </div>
</template>

<script>
import newMsg from "@/components/postMsg.vue";
import boxAcc from "@/components/boxAccount.vue";

const axios = require("axios").default;
export default {
  name: "Post",
  components: {
    newMessage: newMsg,
    accountBox: boxAcc,
  },
  
  
 created() {
    
    axios
        .get("http://localhost:3000/message")
        .then((reponse) => (this.posts = reponse.data))
        .catch((error) => console.log(error));
    },
  ready() {
     setInterval(() => {
    axios
        .get("http://localhost:3000/message")
        .then((reponse) => (this.posts = reponse.data))
        .catch((error) => console.log(error));
        }, 60000) ;
    },
  beforeCreate() {    
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`
  },
    

  props: {
    msg: String,
  },
  
  data() {
    return {
      posts: [],
      revele: false,
    };
  },
  methods: {
    selecOne(id) { 
      axios
        .post("http://localhost:3000/message/"+ id)
        .then(console.log(id))
    },

    toggleNewMsg: function () {
      this.revele = !this.revele;
    },
  },
};

</script>
