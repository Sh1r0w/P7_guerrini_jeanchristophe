<template>
  <div class="MessageHome">
    <h1>{{ msg }}</h1>
    <button @click="toggleNewMsg" class="d-flex ms-5 mb-5 btn btn-success">
      Nouveau Message
    </button>

    <div class="selectMsg d-flex flex-column">
      <div class="col-5 container border border-dark">
        <h2>Message Recents</h2>
        <ul>
          <li v-for="post in posts" v-bind:key="post" @click="selecOne(post.id)" :id="post.id">{{ post.title }} {{ post.createdAt }}</li>
        </ul>
      </div>
      <br/>
      <div class="col-5 container border border-dark">
        <h2>Tout les messages</h2>
        <ul>
          <li v-for="post in posts" v-bind:key="post">{{ post.title }} {{ post.createdAt }}</li>
        </ul>
      </div>
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
  beforeCreate() {
     setInterval(() => {
    axios
        .get("http://localhost:3000/message")
        .then((reponse) => (this.posts = reponse.data))
        .catch((error) => console.log(error));
        }, 60000)
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
