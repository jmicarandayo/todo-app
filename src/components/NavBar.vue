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
        <button class="sign-in-btn" @click="handleSignInModal">
        sign in
    </button>
    <button class="sign-up-btn" @click="handleSignUpModal">
        sign up
    </button>
    </div>
    <div v-else>
        <button class="logout-btn" @click="logout">logout</button>
    </div>
</div>
</div>
</template>

<script>


export default {
    props: ['user'],
    // computed() {
    //     const local = localStorage.getItem('token')
    //     this.user = local
    // },
    methods: {
        handleSignUpModal() {
            this.$emit('openSignUp')
        },
        handleSignInModal() {
            this.$emit('openSignIn')
        },
        logout() {
            this.$emit('userOut', null)
            localStorage.clear()
            this.$router.push('/')
        }
    },
}

</script>

<style>
.navbar {
    background-color: crimson;
    padding: 1em 1.5em;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.navbar .user-menu {

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
    color: #fff;
}
.navbar .navbar-links .sign-up-btn,
.navbar .navbar-links .logout-btn {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: none;
    background-color: aquamarine;
    padding: .5em 1.2em;
    border-radius: 10px;
    margin-left: 2em;
}
</style>