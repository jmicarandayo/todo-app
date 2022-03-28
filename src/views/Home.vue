<template>
  <div class="hero">
      <h1 class="hero-title">This is a Demo Project</h1>
      <p class="hero-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <button @click="openSignUp" class="join-us-btn">join us</button> 
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  components: {
   
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
    color: #000;
    text-align: center;
  }
  .hero .hero-title {
    font-size: 4.5em;
    font-weight: 700;
  }
  .hero .hero-text {
    max-width: 30%;
    margin: 2em auto;
  }
  .hero .join-us-btn {
    text-transform: capitalize;
    padding: .7em 4em;
    font-size: 1.5em;
    background-color: #000;
    color: #FFFFFF;
    font-weight: 500;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
</style>