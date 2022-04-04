<template>
<div class="navbar">
    <div v-if="!user" class="brand-title">
    DemoProj
    </div>
    <div v-else class="user-menu">
        <router-link class="menu-link" to="/dashboard">Dashboard</router-link>
        <router-link class="menu-link" to="/tasks">Tasks</router-link>
    </div>
<div class="navbar-links">
    <div v-if="!user">
        <!-- <button class="sign-in-btn" @click="handleSignInModal">
        sign in
    </button>
    <button class="sign-up-btn" @click="handleSignUpModal">
        sign up
    </button> -->
    <Button @click="handleSignInModal" class="sign-in-btn">sign in</Button>
    <Button @click="handleSignUpModal" class="sign-up-btn">sign up</Button>
    </div>
    <!-- <div v-else>
        <button class="logout-btn" @click="logout">logout</button>
    </div> -->
   <Button v-else @click="logout">logout</Button>
</div>
</div>
</template>

<script>
import Button from '../components/Button.vue'

export default {
    props: ["user"],
    // computed() {
    //     const local = localStorage.getItem('token')
    //     this.user = local
    // },
    methods: {
        handleSignUpModal() {
            this.$emit("openSignUp");
        },
        handleSignInModal() {
            this.$emit("openSignIn");
        },
        logout() {
            this.$emit("userOut", null);
            localStorage.clear();
            this.$router.push("/");
        }
    },
    components: { Button }
}

</script>

<style>
.navbar {
    background-color: #798897;
    padding: 1em 1.5em;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.navbar .brand-title {
    color: #FFF6F4;
}
.navbar .user-menu .menu-link {
    text-decoration: none;
    color: #fff;
    margin-right: 1em;
    font-size: 1.2em;

}
.navbar .navbar-links {
    display: flex;
}
.navbar .navbar-links button {
    font-size: 1em;
    text-transform: capitalize;
      cursor: pointer;
}
.navbar .navbar-links .sign-in-btn 
{
    background-color: transparent;
    border: none;
    color: #FFF6F4;
    box-shadow: none;
}
.navbar .navbar-links .sign-up-btn,
.navbar .navbar-links .logout-btn {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: 1.5px solid #DC143C;
    background-color: #FFF6F4;
    padding: .5em 1.2em;
    border-radius: 10px;
    margin-left: 2em;
    color: #DC143C;
}
</style>