<template>
  <div class="hero">
      <h1 class="hero-title">This is a Demo Project</h1>
      <p class="hero-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <!-- <button @click="openSignUp" class="join-us-btn">join us</button>  -->
      <Button @click="openSignUp" class="join-us-btn">join us</Button>
      <!-- <div class="parallax-section">
        <img src="../assets/images/cloud3.png" id="cloud3">
        <img src="../assets/images/mountain2.png" id="mountain">
      </div> -->
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
  /* body {
    min-height: 100vh;
    background:linear-gradient(#798897,#000)
  }
  .parallax-section {
    position: relative;
    width: 100%;
    height: 100vh;
    padding: 100px;
  }
  .parallax-section #mountain {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .parallax-section #cloud3 {
    position: absolute;
    top: 0;
    left: 0;
    width: 400px;
    height: 400px;
    object-fit: cover;
  } */
  .hero {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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
    font-size: 1.2em;
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
    position: relative;
  }
  .hero .join-us-btn:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      background: #798897;
      border-radius: 10px;
      z-index: -1;
    }
    .hero .join-us-btn:hover:before {
      transform: scale(2);
      transition: all 0.4s linear;
      opacity: 0;
    }
    @media (max-width: 700px) {
      .hero .hero-title {
        font-size: 3.5em;
      }
      .hero .hero-text {
        font-size: 1em;
      }
      .hero .join-us-btn {
        font-size: 1.2em;
      }
    }
  /* .hero .join-us-btn:active {
    scale: .2;
  } */
</style>