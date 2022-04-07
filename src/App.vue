<template>
    <div id="nav">
      <NavBar :showSignUp="showSignUp" 
        @openSignUp="openSignUpModal"
        @openSignIn="openSignInModal"
        :user="user"
        @userOut="updateStatus($event)"/>
    <div v-if="showSignUp">
      <SignUp 
        @close="closeSignUpModal"
        
        :switchModal="switchModal"/>
    </div>
    <div v-if="showSignIn">
      <SignIn 
        @close="closeSignInModal"
        @openSignUp="switchModal"
        :closeSignInModal="closeSignInModal"/>
    </div>
  </div>
  <router-view @open="openSignUpModal" @loggedIn="updateStatus($event)" :user="user"/>
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
      showSignIn: false,
      user: null,
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
    },
    updateStatus(status) {
      this.user = status
    }
  }
}


</script>

<style>
</style>
