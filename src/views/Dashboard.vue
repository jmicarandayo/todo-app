<template>
<h1>Welcome to Dashboard</h1>
    <!-- <h2>{{email}}</h2> -->
</template>

<script>

import axios from 'axios'

export default {
    data() {
        return {
            email: '',
        }
    },
    created(){
        if(localStorage.getItem('token') === null) {
            this.$router.push('/')
        }
    },
    mounted() {
        axios.get('http://localhost:5000/user', { headers: {
            token: localStorage.getItem('token')
        }})
        .then(res => {
            this.email = res.data.user.email
            console.log(this.email)
            this.$emit('loggedIn', this.email)
        })
    }   
}


</script>


<style>
h1 {
    color: black;
    text-align: center;
    margin: 100px auto;
}

</style>