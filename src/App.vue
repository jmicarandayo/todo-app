<template>
  <div id="nav">
    <NavBar :showSignUp="showSignUp" 
    @openSignUp="openSignUpModal"
     @openSignIn="openSignInModal"/>
    <div v-if="showSignUp">
    <SignUp 
    @close="closeSignUpModal"
    @openSignIn="switchModal"/>
    </div>
    <div v-if="showSignIn">
    <SignIn 
    @close="closeSignInModal"
    @openSignUp="switchModal"/>
    </div>
  </div>
  <router-view @open="openSignUpModal"/>
</template>


<script>
import NavBar from "@/components/NavBar.vue"
import SignUp from '@/components/modals/SignUp.vue'
import SignIn from '@/components/modals/SignIn.vue'
export default {
  components: {
    NavBar,
     SignUp,
     SignIn
  },
  data () {
    return {
      showSignUp: false,
      showSignIn: false
    }
  },
  methods: {
      openSignUpModal() {
        this.showSignUp = true
    },
      openSignInModal() {
        this.showSignIn = true
    },
      closeSignUpModal() {
        this.showSignUp = false
    },
      closeSignInModal() {
        this.showSignIn = false
    },
    switchModal() {
      this.showSignIn = !this.showSignIn
      this.showSignUp = !this.showSignUp
    }
  }
}


</script>

<style>

</style>
