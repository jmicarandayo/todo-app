<template>
  <div class="home-container">
    <div class="hero">
      <img src="../assets/images/mountain2.png" id="mountain" ref="parallax">
      <h1 class="hero-title">This is a Demo Project</h1>
      <p class="hero-text">This demo app is called a todo app. The authorized user can create his daily or weekly tasks. He could also update the status of a specific task and then remove it if desired. </p>
      <Button @click="openSignUp" class="join-us-btn">join us</Button>
    </div>
    <div class="section1">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, ipsa. Illum vero, nostrum corporis voluptates modi deserunt deleniti eos. Recusandae exercitationem optio cumque fuga soluta quos doloribus minus tempore, sint est natus libero provident repellendus sed, sequi, consequuntur doloremque pariatur possimus et cupiditate asperiores illum aliquid adipisci! Expedita, quaerat, officiis, unde laudantium molestias rerum ad aspernatur ex sed eum laborum ratione id repellat hic! Cupiditate atque consequatur, pariatur ullam explicabo, fuga aperiam reiciendis error voluptas eius repellendus sit illo reprehenderit assumenda porro, non dolores consectetur aliquam. Harum libero quis architecto quo illum voluptates eligendi. Consequatur ipsam officia modi laborum dolores vitae reiciendis nulla a, perferendis deleniti magnam eligendi distinctio quidem possimus ea nam! Tempore ut facere corrupti id unde sit, necessitatibus ducimus repellat minus possimus, voluptate ullam culpa excepturi. Eveniet facilis quasi autem velit provident. Modi ea est excepturi neque soluta amet, deserunt velit hic atque. Laudantium iure, est, tempora optio tempore cum, iste unde mollitia totam eos culpa praesentium. Optio tempora odit ex repellendus! Aliquid, vel unde voluptate repellendus facilis error tempora libero cum modi impedit soluta itaque omnis rerum, earum sunt veniam provident ratione ab ducimus autem, deserunt dolorum nulla. Adipisci, quis magni. Doloremque quod deleniti exercitationem quos asperiores natus maxime mollitia odio. Numquam excepturi odit blanditiis quis veniam, sit quia assumenda labore explicabo? Praesentium a quam distinctio expedita pariatur eaque maxime suscipit saepe, fugiat nobis accusantium voluptate quae quod neque dolorum nam. Explicabo commodi magnam odio fuga saepe? Animi dolores quibusdam earum est inventore magni minima illo beatae id consequuntur? Hic iure aut odio, ut aperiam voluptatibus facilis accusamus, saepe, cum est blanditiis voluptatem ipsum. Animi voluptates explicabo a, eligendi tenetur similique, odit nesciunt iure possimus, error odio accusantium. Sit exercitationem dignissimos beatae rerum eveniet laboriosam dolorem? Doloremque repudiandae hic architecto earum soluta, corporis ex minus commodi?</p>
    </div>
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
  },
  created(){
    window.addEventListener('scroll', () => {
      let offset = window.pageYOffset;
      this.$refs.parallax.style.top = offset * .6 + 'px'
      
      // console.log('OffsetY: ', offset)
    })
    console.log(this.$refs.clouds)
  },
  mounted() {
    console.log(this.$refs.clouds)
  }
  
}
</script>

<style>

  .home-container {
    min-height: 100vh;
    background:linear-gradient(#798897,#000);
  }
  .hero {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #DC143C;
    text-align: center;
    /* background-image: url(../assets/images/mountain2.png); */
    /* background-size: cover; */
    /* background-attachment: fixed; */
  }
  #mountain {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit:cover;
  }
  .hero .hero-title {
    color: #FFF6F4;
    font-size: 4.5em;
    font-weight: 700;
    position: relative;
  }
  .hero .hero-text {
    color: #FFF6F4;
    max-width: 30%;
    margin: 2em auto;
    font-size: 1.2em;
    position: relative;
    /* z-index: 20; */
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
  .hero .join-us-btn:hover {
    transform: scale(1);
  }
  .hero::before{
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 200px;
    background: linear-gradient(to top,#000,transparent);
    z-index: 1;
    /* box-shadow: 5px -1px 1px rgba(114, 114, 114, 0.25); */
  }
  .section1 {
    padding: 3em;
    /* margin: 0 auto;
    max-width: 80%; */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    position: relative;
    background-color: #000;
    text-align: center;
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
      z-index:-1 ;
    }
    .hero .join-us-btn:hover:before {
      transform: scale(2);
      transition: all 0.4s linear;
      opacity: 0;
    }
    @media (max-width: 700px) {
      .hero .hero-title {
        font-size: 3rem;
      }
      .hero .hero-text{
        font-size: 1.4rem;
        max-width: 70%;
      }
      .section1 {
        font-size: 1.4rem;
      }
      .hero .join-us-btn {
        font-size: 1.4rem;
      }
    }
  /* .hero .join-us-btn:active {
    scale: .2;
  } */
</style>