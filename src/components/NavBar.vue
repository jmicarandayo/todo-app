<template>
<div class="navbar">
    <div v-if="!user" class="brand-title">
    TodoApp
    </div>
    <div v-else class="user-menu">
        <router-link class="menu-link" to="/dashboard">Dashboard</router-link>
        <router-link class="menu-link" to="/tasks">Tasks</router-link>
    </div>
    <div class="navbar-links">
        <div @click="handleMenu" v-if="!user">
                <i class="fa-solid fa-bars" v-if="burgerBtn"></i>
                <i class="fa-solid fa-xmark" v-else></i>
        </div>
        <div v-if="!user" v-show="showNavMenu" class="navbar-menu">
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
    <Button v-else @click="logout" class="logout-btn">logout
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
    </Button>
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
    data(){
        return {
            burgerBtn: true,
            showNavMenu: true
        }
    },
    components: { Button },
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
        },
        handleMenu(){
            this.burgerBtn = !this.burgerBtn
            this.showNavMenu = !this.showNavMenu
        },
        handleView() {
            this.showNavMenu = window.innerWidth >= 700
            this.burgerBtn = window.innerWidth <= 700
        }
    },
     created() {
        this.handleView();
        window.addEventListener('resize', this.handleView);
    }
}

</script>

<style>
.navbar {
    background-color: #798897;
    padding: .5em 1.5em;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.navbar .brand-title {
    color: #FFF6F4;
    font-size: 1.5em;
    font-weight: 700;
}
.navbar .user-menu .menu-link {
    text-decoration: none;
    color: #fff;
    font-size: 1.2em;
    padding:.5em 1.2em;
    border-radius: 10px;
    
}
.navbar .user-menu .menu-link:first-child{
    margin-left: -.5em;
}
.navbar .user-menu .menu-link:hover {
    background-color: rgba(220, 20, 60, .15);
}
.navbar .navbar-links {
    /* display: flex; */
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
.navbar .navbar-links .sign-in-btn:hover {
    background-color: rgba(220, 20, 60, .15);
}
.navbar .navbar-links .sign-up-btn,
.navbar .navbar-links .logout-btn {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: 1.5px solid #DC143C;
    background-color: #FFF6F4;
    padding: .5em 1.2em;
    border-radius: 10px;
    margin-left: .5em;
    color: #DC143C;
}
.navbar .navbar-links .logout-btn i {
    padding-left: .5em;
}
.navbar .navbar-links .logout-btn:hover,
.navbar .navbar-links .sign-up-btn:hover {
    background-color: #DC143C;
    color: #FFF6F4;
}

.navbar-links .fa-bars,
.navbar-links .fa-xmark {
    position: absolute;
    top: 20px;
    right: 20px;
    display: none;
}
@media (max-width: 700px){
    .navbar .navbar-links .logout-btn {
        border: none;
        background-color: transparent;
        box-shadow: none;
        font-size: 0;
        position: absolute;
        top: 18px;
        right: 25px;
        /* display: flex; */
        /* margin: 0 auto; */
    }
    .navbar .navbar-links .logout-btn .fa-solid {
        font-size: initial;
    }
    .navbar{
        display: block;
        padding: .95em;
    }
    .navbar .navbar-links .navbar-menu{
        display: flex;
        flex-direction: column;
    }
    /* .navbar .navbar-links .navbar-menu.active{
        display: none;
    } */
    .navbar-links .fa-bars,
    .navbar-links .fa-xmark  {
        display: block;
    }
    .navbar .user-menu .menu-link:first-child{
        margin-left:0;
    }
    .navbar .navbar-links .sign-up-btn {
        border-radius: 0;
    }
    .navbar .navbar-links .logout-btn:hover{
        background-color: transparent;
    }
    /* .navbar .navbar-links .sign-up-btn {
        border: none;
        display: i;
    } */
}
</style>