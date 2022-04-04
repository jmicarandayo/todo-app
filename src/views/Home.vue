<template>
  <div class="hero">
      <h1 class="hero-title">This is a Demo Project</h1>
      <p class="hero-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <!-- <button @click="openSignUp" class="join-us-btn">join us</button>  -->
      <Button @click="openSignUp" class="join-us-btn">join us</Button>
  </div>
</template>

<script>
import Button from "../components/Button.vue"
// @ is an alias to /src


export default {
  components: {
    Button
},
  methods: {
    openSignUp() {
      this.$emit('open')
    }
  }
  
}
</script>

<style>
  .hero {
    max-width: 90%;
    margin: 0 auto;
    margin-top: 15em;
    color: #DC143C;
    text-align: center;
  }
  .hero .hero-title {
    color: #798897;
    font-size: 4.5em;
    font-weight: 700;
  }
  .hero .hero-text {
    color: #798897;
    max-width: 30%;
    margin: 2em auto;
  }
  .hero .join-us-btn {
    text-transform: capitalize;
    padding: .7em 4em;
    font-size: 1.5em;
    background-color: #DC143C;
    color: #FFF6F4;
    font-weight: 500;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
  /* .hero .join-us-btn:active {
    scale: .2;
  } */
</style>